## Why

Agents and developers need a defined workflow for picking up open JIRA issues, implementing changes, keeping JIRA status in sync, validating the web UI, and delivering work via a pull request so that work is traceable and quality is assured.

## What Changes

- Define agent workflow for working from open JIRA issues: fetch issue, implement, update JIRA status as work progresses, run UI tests, and open a PR.
- Add requirements that JIRA issue status SHALL be updated when work starts (e.g. In Progress), when work is ready for review (e.g. In Review / PR opened), and when merged or closed.
- Require UI testing (e.g. Playwright or project UI test approach) as part of the “done” criteria before PR creation.
- Require PR creation and linking to the JIRA issue (branch/PR description or comment) so status can be tracked.

## Impact

- Affected specs: New `agent-workflow` capability; `development-workflow` (add JIRA + UI test + PR requirements).
- Affected code: Agent skills (Jira SKILL.md), AGENTS.md or equivalent agent instructions; CI/workflows if UI tests are added to pipeline; no breaking API changes.
