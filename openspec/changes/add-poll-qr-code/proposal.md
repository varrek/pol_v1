## Why
Users need a convenient way to share polls with others. A QR code provides a scannable link that can be displayed on screen, printed, or shared in presentations, making it easy for participants to quickly access a poll on their mobile devices.

## What Changes
- Add QR code generation for each poll's shareable URL
- Display QR code in poll detail view with a "Show QR Code" button
- QR code encodes the direct link to access and vote on the poll
- Use a lightweight QR code library (qrcode.js or similar via CDN)

## Impact
- Affected specs: qr-code (new capability)
- Affected code: `index.html` (UI additions for QR code display)
