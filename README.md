# CDN - Content Delivery Network

A simple and organized CDN (Content Delivery Network) for hosting static assets for websites.

## 📁 Directory Structure

```
cdn/
├── css/          # Stylesheets
├── js/           # JavaScript files
├── images/       # Image assets
├── fonts/        # Web fonts
└── index.html    # Asset catalog/directory
```

## 🚀 Usage

### Including CSS Files

```html
<link rel="stylesheet" href="https://your-cdn-domain.com/css/style.css">
```

### Including JavaScript Files

```html
<script src="https://your-cdn-domain.com/js/main.js"></script>
```

### Using Images

```html
<img src="https://your-cdn-domain.com/images/logo.png" alt="Logo">
```

### Loading Fonts

```css
@font-face {
  font-family: 'CustomFont';
  src: url('https://your-cdn-domain.com/fonts/customfont.woff2') format('woff2');
  font-display: swap;
}
```

## 📦 Available Assets

- **CSS**: `css/style.css` - Base stylesheet with common utilities and CSS variables
- **JavaScript**: `js/main.js` - Utility library with helper functions for dynamic loading

## 🔧 Setup

### For GitHub Pages

1. Enable GitHub Pages in repository settings
2. Select the main/master branch as the source
3. Access your CDN at: `https://username.github.io/cdn/`

### For Custom Domain

1. Add a CNAME file with your domain
2. Configure DNS settings to point to GitHub Pages or your hosting provider
3. Enable HTTPS for secure content delivery

## 🌐 Deployment Options

### GitHub Pages (Recommended for public repos)
- Free hosting for public repositories
- Automatic SSL/TLS certificates
- Global CDN by default

### Other Options
- Netlify
- Vercel
- Cloudflare Pages
- AWS CloudFront + S3
- Azure CDN
- Google Cloud CDN

## 📝 Best Practices

1. **Versioning**: Use versioned URLs (e.g., `/css/style.v1.0.0.css`) for cache management
2. **Minification**: Minify CSS and JS files for production
3. **Compression**: Enable gzip/brotli compression on your server
4. **Cache Headers**: Set appropriate cache headers for static assets
5. **CORS**: Configure CORS headers if serving to external domains

## 🔒 Security

- Ensure all assets are served over HTTPS
- Implement Content Security Policy (CSP) headers
- Regularly update dependencies
- Scan for vulnerabilities

## 📄 License

This project is open source and available for use in your projects.

## 🤝 Contributing

Feel free to submit pull requests or open issues for improvements!