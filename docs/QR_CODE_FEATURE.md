# QR Code Feature Documentation

## Overview

The QR Code feature allows OneLink users to generate, customize, and share QR codes that link directly to their public profiles. This makes it easy for users to share their OneLink profiles in both digital and physical formats.

## Features Implemented

### 1. QR Code Generator Component (`QRCodeGenerator.jsx`)
- **Location**: `src/components/common/QRCodeGenerator.jsx`
- **Purpose**: Reusable component for generating QR codes
- **Features**:
  - Generates QR codes from URLs using the `qrcode` library
  - Customizable size, colors, and styling
  - Download functionality (PNG format)
  - Copy to clipboard functionality
  - Modal and inline display modes
  - Error handling and loading states

### 2. QR Code Admin Tab (`QRCodeTab.jsx`)
- **Location**: `src/components/admin/QRCodeTab.jsx`
- **Purpose**: Admin interface for QR code generation and customization
- **Features**:
  - Real-time QR code preview
  - Size customization (200px to 500px)
  - Color customization with presets and custom colors
  - Profile URL display
  - Usage tips and guidelines
  - Responsive design

### 3. Integration Points

#### Admin Dashboard
- Added new "QR Code" tab in the admin interface
- Tab icon: 📱
- Requires profile slug to be set up first
- Full customization and preview capabilities

#### Public Profile Pages
- Added "Share QR Code" button next to "Ask a Question" button
- Opens modal with QR code for the current profile URL
- Styled to match profile theme colors
- Instant sharing functionality

## Technical Implementation

### Dependencies
```json
{
  "qrcode": "^1.5.3"
}
```

### Key Functions

#### QR Code Generation
```javascript
const qrCodeUrl = await QRCode.toDataURL(url, {
  width: size,
  margin: 2,
  color: {
    dark: foregroundColor,
    light: backgroundColor
  },
  errorCorrectionLevel: 'M'
})
```

#### Download Functionality
```javascript
const downloadQRCode = () => {
  const link = document.createElement('a')
  link.download = `qr-code-${title.toLowerCase().replace(/\s+/g, '-')}.png`
  link.href = qrCodeDataUrl
  link.click()
}
```

#### Clipboard Integration
- Supports copying QR code image to clipboard
- Fallback to copying URL if image copy fails
- Uses modern Clipboard API

## User Flow

### For Profile Owners (Admin)
1. Navigate to Admin Dashboard
2. Click on "QR Code" tab
3. Ensure profile slug is set (redirected to Appearance tab if not)
4. Customize QR code size and colors
5. Download or copy QR code
6. Use in marketing materials, business cards, etc.

### For Profile Visitors (Public)
1. Visit any OneLink profile
2. Click "Share QR Code" button
3. View QR code in modal
4. Download or copy QR code
5. Share with others

## Customization Options

### Size Presets
- Small: 200px
- Medium: 300px
- Large: 400px
- Extra Large: 500px

### Color Presets
- Black on White (default)
- White on Black
- Blue on White
- Green on White
- Red on White
- Purple on White
- Custom colors supported

### Error Correction
- Level M (Medium) - balances error correction and data capacity
- Suitable for most use cases including print materials

## Use Cases

### Print Materials
- Business cards
- Flyers and posters
- Event materials
- Product packaging
- Brochures and catalogs

### Digital Sharing
- Social media posts
- Email signatures
- Website integration
- Presentation slides
- Digital business cards

## File Structure
```
src/
├── components/
│   ├── admin/
│   │   └── QRCodeTab.jsx          # Admin interface
│   └── common/
│       └── QRCodeGenerator.jsx    # Core component
└── pages/
    ├── AdminPage.jsx              # Updated with QR tab
    └── PublicProfilePage.jsx      # Updated with share button
```

## Security Considerations

1. **URL Validation**: QR codes only generate for valid OneLink profile URLs
2. **No External URLs**: Prevents generation of QR codes for malicious URLs
3. **Client-side Generation**: QR codes are generated in the browser, no server-side processing
4. **Safe Downloads**: Downloaded files are PNG images with sanitized filenames

## Performance Considerations

1. **Lazy Loading**: QR codes are generated on-demand
2. **Optimized Rendering**: Preview size is limited to prevent performance issues
3. **Error Handling**: Graceful fallbacks for generation failures
4. **Memory Management**: Canvas elements are properly cleaned up

## Accessibility Features

1. **Alt Text**: QR code images include descriptive alt text
2. **Keyboard Navigation**: All interactive elements are keyboard accessible
3. **Screen Reader Support**: Proper ARIA labels and semantic HTML
4. **High Contrast**: Color customization supports accessibility requirements

## Future Enhancements

### Potential Improvements
1. **SVG Output**: Support for vector format downloads
2. **Logo Integration**: Ability to embed profile pictures in QR codes
3. **Analytics**: Track QR code scans and usage
4. **Batch Generation**: Generate multiple QR codes for different content blocks
5. **Social Media Integration**: Direct sharing to social platforms
6. **Print Templates**: Pre-designed templates for business cards and materials

### API Integration Possibilities
1. **URL Shortening**: Integration with URL shortening services
2. **Dynamic QR Codes**: QR codes that can be updated without reprinting
3. **Advanced Analytics**: Detailed scan tracking and user insights

## Testing Checklist

- [ ] QR code generates correctly with valid profile URL
- [ ] Customization options work properly
- [ ] Download functionality works across browsers
- [ ] Copy to clipboard works with fallback
- [ ] Modal opens and closes correctly
- [ ] Mobile responsiveness
- [ ] Color contrast accessibility
- [ ] Error handling for invalid inputs
- [ ] Performance with large QR codes
- [ ] Cross-browser compatibility

## Browser Support

- **Modern Browsers**: Chrome 76+, Firefox 63+, Safari 13.1+, Edge 79+
- **Features Used**:
  - Canvas API (QR code generation)
  - Clipboard API (copy functionality)
  - Download attribute (file downloads)
  - CSS Grid and Flexbox (layout)

## Conclusion

The QR Code feature significantly enhances OneLink's sharing capabilities, providing users with a modern, efficient way to distribute their profiles across both digital and physical channels. The implementation is robust, accessible, and provides a solid foundation for future enhancements.