## Why

Users need a simple way to share polls with others by generating a QR code that links directly to a specific poll, enabling easy sharing via mobile devices and physical media.

## What Changes

- Add QR code generation library (qrcode.js via CDN)
- Display QR code on poll detail page
- QR code encodes URL that links directly to the poll
- Include visual QR code display with share instructions

## Impact

- Affected specs: `web-ui` (adding new requirement)
- Affected code: `index.html` (add QR code generation and display)
- Dependencies: None (uses CDN-hosted library)
