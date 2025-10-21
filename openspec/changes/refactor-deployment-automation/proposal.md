# Refactor Deployment to Use MCP Automation

## Why

Manual Git operations (commit, push, PR creation) are error-prone and time-consuming. The project currently relies on manual terminal commands or GitHub CLI for deployment workflows. By leveraging Model Context Protocol (MCP) GitHub integration, we can automate the entire deployment pipeline through programmatic API calls, ensuring consistency and reducing human error.

## What Changes

- Add automated deployment workflow using MCP GitHub tools
- Programmatic commit creation via `mcp_github_push_files`
- Automated PR creation with `mcp_github_create_pull_request`
- Branch management through MCP tools (`mcp_github_create_branch`, etc.)
- Integration with OpenSpec change archival workflow
- Remove dependency on manual git commands for standard workflows

## Impact

- **Affected specs**: `deployment-automation` (new capability)
- **Affected code**: 
  - New: Deployment automation scripts/workflow
  - Modified: `PR_GUIDE.md` (update to reference automated workflow)
  - Modified: `README.md` (add section on automated deployment)
- **Dependencies**: Requires GitHub MCP server configuration (already present in `.cursor/mcp.json`)
- **Breaking changes**: None (manual workflows remain available as fallback)
