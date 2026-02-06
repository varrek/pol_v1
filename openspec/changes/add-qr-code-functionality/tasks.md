## 1. OpenSpec and implementation

- [x] 1.1 Add share URL helper and unit test (buildPollShareUrl in voting-system or util, tested in Jest)
- [x] 1.2 In index.html: on load, if hash matches a poll id, open that poll view
- [x] 1.3 In poll detail view: display QR code image encoding the poll share URL
- [x] 1.4 Run `npm test` and fix any failures
- [x] 1.5 Manually verify in browser: open poll, see QR; open URL with hash, land on poll

## 2. Validation and PR

- [x] 2.1 Run `openspec validate add-qr-code-functionality --strict`
- [x] 2.2 Mark tasks complete, push branch, create PR
- [ ] 2.3 Set KAN-4 to In Review; if PR review comments, create JIRA tickets for them
