# Simple CDN Server

A lightweight, high-performance Content Delivery Network (CDN) server built with Node.js. This CDN server is designed to efficiently serve static files with built-in caching, compression, and CORS support.

## 🚀 Features

- **Fast File Delivery**: Optimized static file serving with in-memory caching
- **Smart Caching**: Implements both server-side and browser caching strategies
- **Compression**: Automatic gzip compression for improved transfer speeds
- **CORS Support**: Built-in Cross-Origin Resource Sharing for seamless integration
- **Multiple MIME Types**: Supports various file formats (HTML, CSS, JS, images, fonts, etc.)
- **Cache Management**: Intelligent cache cleanup based on access frequency
- **ETags & Conditional Requests**: Implements HTTP caching headers for optimal performance
- **Security**: Directory traversal protection and safe file serving

## 📋 Requirements

- Node.js >= 14.0.0

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Junior-ENSEA/cdn.git
cd cdn
```

2. No additional dependencies needed - uses Node.js built-in modules only!

## 🎯 Usage

### Starting the Server

```bash
npm start
```

The server will start on `http://localhost:8080` by default.

### Configuration

Edit `config.json` to customize the server settings:

```json
{
  "host": "0.0.0.0",
  "port": 8080,
  "publicDir": "public",
  "cache": {
    "enabled": true,
    "maxItems": 1000,
    "maxFileSize": 10485760,
    "browserCacheTTL": 3600
  },
  "compression": {
    "enabled": true
  },
  "cors": {
    "enabled": true,
    "allowOrigin": "*",
    "allowMethods": "GET, HEAD, OPTIONS",
    "allowHeaders": "Origin, X-Requested-With, Content-Type, Accept"
  }
}
```

#### Configuration Options

- **host**: Server host address (default: `0.0.0.0`)
- **port**: Server port number (default: `8080`)
- **publicDir**: Directory to serve files from (default: `public`)
- **cache.enabled**: Enable/disable server-side caching
- **cache.maxItems**: Maximum number of files to cache in memory
- **cache.maxFileSize**: Maximum file size to cache (in bytes)
- **cache.browserCacheTTL**: Browser cache time-to-live in seconds
- **compression.enabled**: Enable/disable gzip compression
- **cors.enabled**: Enable/disable CORS headers
- **cors.allowOrigin**: Allowed origins for CORS
- **cors.allowMethods**: Allowed HTTP methods
- **cors.allowHeaders**: Allowed request headers

## 📁 Project Structure

```
cdn/
├── server.js           # Main server file
├── config.json         # Server configuration
├── package.json        # Project metadata
├── README.md          # Documentation
├── .gitignore         # Git ignore rules
└── public/            # Static files directory
    ├── index.html     # Example HTML file
    ├── css/
    │   └── style.css  # Example CSS file
    ├── js/
    │   └── main.js    # Example JavaScript file
    └── images/        # Images directory
```

## 📦 Adding Your Own Files

Simply place your static files in the `public/` directory:

```
public/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
│   ├── logo.png
│   └── banner.jpg
└── fonts/
    └── custom-font.woff2
```

Access them via:
- `http://localhost:8080/index.html`
- `http://localhost:8080/css/style.css`
- `http://localhost:8080/js/app.js`
- `http://localhost:8080/images/logo.png`

## 🔧 How It Works

1. **Request Handling**: The server receives HTTP requests and parses the requested file path
2. **Security Check**: Validates the path to prevent directory traversal attacks
3. **Cache Lookup**: Checks if the file exists in the in-memory cache
4. **File Serving**: If not cached, reads the file from disk and optionally caches it
5. **Compression**: Applies gzip compression if supported by the client
6. **Headers**: Sets appropriate MIME types, caching headers, and CORS headers
7. **Response**: Sends the file to the client with optimal headers

## 🎨 Supported File Types

The CDN automatically serves the correct MIME type for:

- **Web**: HTML, CSS, JavaScript, JSON, XML
- **Images**: PNG, JPG, JPEG, GIF, SVG, ICO, WebP
- **Fonts**: WOFF, WOFF2, TTF, EOT
- **Documents**: PDF, TXT
- **Default**: application/octet-stream for unknown types

## 🔒 Security Features

- **Directory Traversal Protection**: Prevents access to files outside the public directory
- **Path Validation**: Sanitizes and validates all file paths
- **Error Handling**: Proper error responses without exposing system information

## ⚡ Performance Features

### Caching Strategy
- **In-Memory Cache**: Frequently accessed files are cached in RAM
- **LRU Eviction**: Least-used files are removed when cache is full
- **Conditional Requests**: Supports `If-Modified-Since` and `ETag` headers
- **Browser Caching**: Configurable TTL for client-side caching

### Compression
- **Automatic gzip**: Compresses responses when client supports it
- **Selective Compression**: Only compresses when beneficial

## 📊 Logging

The server logs all requests with:
- Timestamp
- HTTP method
- Request path
- User agent
- Cache hit/miss status
- File size and response status

## 🧪 Testing the CDN

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:8080
```

3. You should see a welcome page with CDN features demonstrated.

4. Test different file types:
   - `http://localhost:8080/css/style.css`
   - `http://localhost:8080/js/main.js`

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 👤 Author

Junior-ENSEA

---

**Happy CDN serving! 🚀**