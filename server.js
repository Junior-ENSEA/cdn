const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const url = require('url');

// Load configuration
const config = require('./config.json');

// In-memory cache
const cache = new Map();
const cacheStats = new Map();

// MIME types for common file types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml',
  '.webp': 'image/webp'
};

// Cache cleanup - remove least accessed items when cache is full
function cleanupCache() {
  if (cache.size >= config.cache.maxItems) {
    // Sort by access count and remove least accessed
    const sortedStats = Array.from(cacheStats.entries())
      .sort((a, b) => a[1].count - b[1].count);
    
    const toRemove = Math.floor(config.cache.maxItems * 0.2); // Remove 20%
    for (let i = 0; i < toRemove && i < sortedStats.length; i++) {
      const key = sortedStats[i][0];
      cache.delete(key);
      cacheStats.delete(key);
    }
  }
}

// Get file from cache or disk
function getFile(filePath, callback) {
  // Check cache first
  if (config.cache.enabled && cache.has(filePath)) {
    const cached = cache.get(filePath);
    const stats = cacheStats.get(filePath);
    stats.count++;
    stats.lastAccessed = Date.now();
    
    console.log(`[CACHE HIT] ${filePath}`);
    return callback(null, cached.content, cached.mtime);
  }

  // Read from disk
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(err);
    }

    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        return callback(statErr);
      }

      // Add to cache if enabled and file is smaller than max size
      if (config.cache.enabled && stats.size <= config.cache.maxFileSize) {
        cleanupCache();
        cache.set(filePath, { content, mtime: stats.mtime });
        cacheStats.set(filePath, {
          count: 1,
          lastAccessed: Date.now(),
          size: stats.size
        });
        console.log(`[CACHE MISS] ${filePath} - Added to cache`);
      }

      callback(null, content, stats.mtime);
    });
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname} - ${req.headers['user-agent'] || 'Unknown'}`);

  // Security: prevent directory traversal
  if (pathname.includes('..')) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  // Default to index.html for directory requests
  if (pathname === '/' || pathname.endsWith('/')) {
    pathname = path.join(pathname, 'index.html');
  }

  // Build file path
  const filePath = path.join(__dirname, config.publicDir, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  // Get file (from cache or disk)
  getFile(filePath, (err, content, mtime) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - File Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
      }
      console.log(`[ERROR] ${pathname}: ${err.message}`);
      return;
    }

    // Set headers
    const headers = {
      'Content-Type': mimeType,
      'Cache-Control': `public, max-age=${config.cache.browserCacheTTL}`,
      'Last-Modified': mtime.toUTCString(),
      'ETag': `"${mtime.getTime()}-${content.length}"`,
    };

    // CORS headers
    if (config.cors.enabled) {
      headers['Access-Control-Allow-Origin'] = config.cors.allowOrigin;
      headers['Access-Control-Allow-Methods'] = config.cors.allowMethods;
      headers['Access-Control-Allow-Headers'] = config.cors.allowHeaders;
    }

    // Check if client has cached version
    const ifModifiedSince = req.headers['if-modified-since'];
    const ifNoneMatch = req.headers['if-none-match'];
    
    if (ifModifiedSince && new Date(ifModifiedSince) >= mtime) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    if (ifNoneMatch && ifNoneMatch === headers['ETag']) {
      res.writeHead(304, headers);
      res.end();
      return;
    }

    // Compression support
    const acceptEncoding = req.headers['accept-encoding'] || '';
    
    if (config.compression.enabled && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      zlib.gzip(content, (err, compressed) => {
        if (err) {
          res.end(content);
        } else {
          res.end(compressed);
        }
      });
    } else {
      res.writeHead(200, headers);
      res.end(content);
    }

    console.log(`[SUCCESS] ${pathname} - ${content.length} bytes`);
  });
});

// Start server
server.listen(config.port, config.host, () => {
  console.log('='.repeat(60));
  console.log('🚀 CDN Server Started Successfully!');
  console.log('='.repeat(60));
  console.log(`📡 Server running at http://${config.host}:${config.port}/`);
  console.log(`📁 Serving files from: ${config.publicDir}`);
  console.log(`💾 Cache: ${config.cache.enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`🗜️  Compression: ${config.compression.enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`🌐 CORS: ${config.cors.enabled ? 'Enabled' : 'Disabled'}`);
  console.log('='.repeat(60));
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Export for testing
module.exports = server;
