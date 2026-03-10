# Tasks: Add QR Code Linking to Poll

## 1. URL routing

- [x] 1.1 On load and on hash change, parse `#poll/<pollId>` and show poll detail view for that poll when valid.
- [x] 1.2 When navigating to a poll (list click or after create), set `location.hash` to `#poll/<pollId>` so the URL is shareable.

## 2. QR code on poll detail

- [x] 2.1 On poll detail view, generate and display a QR code that encodes the full URL to the current poll (origin + hash).
- [x] 2.2 Ensure the QR code updates when viewing a different poll and does not show for non-existent polls.

## 3. Tests and validation

- [x] 3.1 Add unit or integration tests for URL parsing / routing behavior where feasible.
- [x] 3.2 Add a Playwright (or manual) browser test: open app with `#poll/<id>`, confirm poll detail is shown; confirm QR is present and links to same poll.
