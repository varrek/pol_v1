## 1. Proposal and validation

- [x] 1.1 Ensure proposal.md, tasks.md, and spec deltas exist and are complete
- [x] 1.2 Run `openspec validate add-jira-workflow-ui-tests-pr --strict` and fix any issues

## 2. Documentation and agent instructions

- [x] 2.1 Add JIRA workflow summary to AGENTS.md (or equivalent): branch from issue, update status (In Progress → In Review → Done), run tests, open PR with issue key, create Jira tickets for PR review comments
- [x] 2.2 Document UI test approach (e.g. npm script or Playwright) in project or AGENTS.md so agents know how to run UI validation

## 3. Testability and automation

- [x] 3.1 Add or document a single command or script to run UI/browser tests (e.g. `npm run test:ui` or usage of Playwright/skill script) so the workflow is repeatable
- [x] 3.2 Ensure pre-commit or CI runs unit tests; document that UI tests are part of “done” criteria before PR

## 4. Verification

- [x] 4.1 Run full automated test suite (`npm test`) and confirm it passes
- [x] 4.2 Run UI/browser tests (or document manual verification) and confirm they pass
- [x] 4.3 Confirm all tasks in this file are checked off before marking the change complete
