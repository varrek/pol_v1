# Add QR Code Linking to Poll

## Why

Users need a quick way to share a poll with others (e.g. on mobile or in person). A QR code that encodes the poll URL lets anyone scan and open the poll directly in the browser.

## What Changes

- Add URL routing so that a poll can be opened via a shareable URL (e.g. hash-based `#poll/<pollId>`).
- On the poll detail view, display a QR code that encodes the full URL to that poll.
- When the app loads with a poll ID in the URL, open the poll detail view for that poll.

## Impact

- Affected specs: web-ui (new requirement)
- Affected code: `index.html` (routing, poll detail rendering, QR code generation/display)
