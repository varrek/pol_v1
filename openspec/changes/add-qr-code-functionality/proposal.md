## Why

Users need an easy way to share polls with others. QR codes provide a quick, mobile-friendly method for sharing poll links that can be scanned by any smartphone camera.

## What Changes

- Add QR code generation for poll sharing links
- Display QR code on poll detail page
- Include poll ID encoded in the QR code URL
- Add ability to download/copy QR code image

## Impact

- Affected specs: qr-code (new capability)
- Affected code: index.html (UI), voting-system.ts (URL generation helper)
