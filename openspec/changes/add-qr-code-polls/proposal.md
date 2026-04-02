## Why

Users want to easily share polls with others via mobile devices. A QR code provides a quick, scannable way to share poll links without typing URLs.

## What Changes

- Add QR code generation button to poll detail view
- Generate QR code containing the poll's shareable URL
- Display QR code in a modal for easy scanning
- Allow downloading QR code as an image

## Impact

- Affected specs: `qr-sharing` (new capability)
- Affected code: `index.html` (UI components and QR generation logic)
