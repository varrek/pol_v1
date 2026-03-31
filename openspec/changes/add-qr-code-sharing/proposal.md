## Why

Users need an easy way to share polls with others by generating and scanning QR codes, enabling quick access to polls without manually typing URLs.

## What Changes

- Add QR code generation for poll URLs
- Add QR code display in poll detail view
- Add QR code scanner to join polls
- Add shareable poll links with QR codes
- Integrate QR functionality into existing web interface

## Impact

- Affected specs: `qr-sharing` (new capability), `web-ui` (modified)
- Affected code: index.html (add QR generation and scanning)
- Dependencies: Requires existing `web-ui` and `voting` capabilities

