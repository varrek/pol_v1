## Why

Users need a way to share a poll so others can open it directly (e.g. by scanning a QR code), as requested in KAN-4: "create a QR code functionality that links to poll."

## What Changes

- Add share URL for each poll (same page with hash `#pollId` so opening the link shows that poll).
- On app load, read hash and open the poll view when present.
- On poll detail view, show a QR code that encodes the poll share URL.
- Add a small, testable helper for building the share URL (optional, for unit tests).

## Impact

- Affected specs: `qr-code` (new capability)
- Affected code: `index.html` (poll detail view, load hash), optionally `voting-system.ts` for share-URL helper
- Dependencies: None (QR via public API or inline SVG/canvas to avoid new npm deps)
