## Why
Poll creators need a quick way to share polls with participants. QR codes provide instant mobile access, eliminating the need to manually type URLs.

## What Changes
- Add QR code generation for each poll using a lightweight library (qrcode.js or similar)
- Display QR code in poll detail view with download option
- Add "Share Poll" section with QR code and copyable URL
- Support URL-based poll navigation (e.g., `?poll=poll_1`)

## Impact
- Affected specs: qr-code (new capability)
- Affected code: index.html (add QR generation, URL routing, share UI)
