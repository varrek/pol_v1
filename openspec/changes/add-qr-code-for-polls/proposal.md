## Why

Users need a convenient way to share polls with others. QR codes provide an easy mobile-friendly method to quickly access a specific poll without typing URLs.

## What Changes

- Add QR code generation for each poll
- Display QR code in poll detail view
- QR code encodes the poll URL with poll ID
- Use external QR code library (qrcode.js via CDN)

## Impact

- Affected specs: qr-code (new capability)
- Affected code: index.html (add QR code display and generation)
