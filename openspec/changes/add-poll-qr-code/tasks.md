## 1. URL-based Poll Navigation
- [x] 1.1 Parse URL query parameters on page load
- [x] 1.2 Navigate to poll detail view if `?poll=<id>` is present
- [x] 1.3 Update URL when viewing a poll (using history API)

## 2. QR Code Generation
- [x] 2.1 Add QR code generation library (inline or CDN)
- [x] 2.2 Create `generateQRCode(pollId)` function
- [x] 2.3 Generate QR code that encodes the poll URL

## 3. Share UI
- [x] 3.1 Add "Share Poll" section in poll detail view
- [x] 3.2 Display generated QR code
- [x] 3.3 Add "Download QR" button
- [x] 3.4 Add copyable poll URL with "Copy" button

## 4. Validation & Testing
- [x] 4.1 Test QR code scanning navigates to correct poll
- [x] 4.2 Test URL navigation works on page load
- [x] 4.3 Test QR code download functionality
