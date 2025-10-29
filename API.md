# CDN API Documentation

This CDN provides a simple API for accessing static assets.

## Base URL

```
https://your-cdn-domain.com
```

## Endpoints

### Static Assets

All static assets are served directly from their respective directories:

- **CSS**: `/css/{filename}.css`
- **JavaScript**: `/js/{filename}.js`
- **Images**: `/images/{filename}.{ext}`
- **Fonts**: `/fonts/{filename}.{ext}`

### Asset Catalog

- **GET** `/` or `/index.html` - Browse available assets
- **GET** `/example.html` - View usage examples

## CORS Headers

This CDN supports Cross-Origin Resource Sharing (CORS) for all assets.

## Caching

- Static assets are cached with appropriate cache headers
- Use versioning in filenames for cache busting (e.g., `style.v1.0.0.css`)

## Rate Limiting

No rate limiting is applied for public assets.

## Example Usage

### CSS
```html
<link rel="stylesheet" href="https://your-cdn-domain.com/css/style.css">
```

### JavaScript
```html
<script src="https://your-cdn-domain.com/js/main.js"></script>
```

### Images
```html
<img src="https://your-cdn-domain.com/images/logo.png" alt="Logo">
```

## Support

For issues or questions, please visit: https://github.com/Junior-ENSEA/cdn/issues
