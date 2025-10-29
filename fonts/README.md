# Fonts Directory

This directory contains web font files served via the CDN.

## Supported Formats
- WOFF2
- WOFF
- TTF
- OTF
- EOT

## Usage Example

```css
@font-face {
  font-family: 'CustomFont';
  src: url('https://your-cdn-domain.com/fonts/customfont.woff2') format('woff2'),
       url('https://your-cdn-domain.com/fonts/customfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Best Practices
- Use WOFF2 format for modern browsers (best compression)
- Provide WOFF fallback for older browsers
- Use `font-display: swap` for better performance
