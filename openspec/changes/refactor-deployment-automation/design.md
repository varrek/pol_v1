# Design: Deployment Automation via MCP

## Context

The project uses OpenSpec for change management and GitHub for version control. Currently, deployment involves:
1. Manual `git push` commands
2. Manual PR creation (via `gh` CLI or web interface)
3. Manual review requests
4. Manual branch management

The GitHub MCP server is already configured at `~/.cursor/mcp.json` and provides programmatic access to GitHub APIs.

## Goals / Non-Goals

**Goals:**
- Automate commit, push, and PR creation using MCP GitHub tools
- Integrate with OpenSpec workflow (change proposals → implementation → PR → archive)
- Provide clear error handling and status reporting
- Maintain compatibility with existing manual workflows

**Non-Goals:**
- Replace all manual Git operations (users can still use git/gh CLI)
- Auto-merge PRs (human review remains required)
- Implement CI/CD pipelines (focus is on PR creation only)
- Modify core voting system functionality

## Decisions

### 1. Use MCP GitHub Tools Over Git CLI

**Decision**: Use MCP `mcp_github_*` tools instead of running `git` terminal commands.

**Rationale**:
- Native GitHub API integration (no authentication hassle)
- Better error messages and status reporting
- Consistent behavior across environments
- Aligns with project's MCP infrastructure

**Alternatives considered**:
- GitHub CLI (`gh`): Requires separate authentication setup
- Terminal `git` commands: Less reliable error handling, authentication issues
- GitHub REST API directly: More boilerplate, MCP provides abstraction

### 2. Workflow Sequence

**Decision**: Follow this automation sequence:
1. Detect/create feature branch (via `mcp_github_create_branch` if needed)
2. Collect changed files programmatically
3. Push files atomically (via `mcp_github_push_files`)
4. Create PR with generated description (via `mcp_github_create_pull_request`)
5. Optionally request Copilot review (via `mcp_github_request_copilot_review`)

**Rationale**:
- Atomic operations reduce partial-state errors
- Automated PR descriptions from OpenSpec tasks
- Review requests integrated into workflow

### 3. File Collection Strategy

**Decision**: Use explicit file paths rather than `git status` parsing.

**Rationale**:
- More predictable (no hidden/ignored files)
- Works with OpenSpec change structure
- Easier to test and debug

**Trade-offs**:
- Requires listing files explicitly
- Won't catch uncommitted changes automatically

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| MCP authentication failure | Fallback to manual workflow, clear error messages |
| Network issues during push | Retry logic, transaction rollback documentation |
| PR description generation errors | Template-based fallback, validate before push |
| Loss of git history control | Use meaningful commit messages, preserve manual git access |

## Migration Plan

**Phase 1**: Create automation script alongside existing manual process
**Phase 2**: Document automated workflow in README
**Phase 3**: Update PR_GUIDE.md to reference both approaches
**Phase 4**: (Future) Integrate into OpenSpec CLI as `openspec deploy` command

**Rollback**: Manual workflows remain fully functional; no breaking changes to existing processes.

## Open Questions

- Should we auto-archive changes after PR merge? (Decision: No, keep manual for now)
- Should we validate OpenSpec status before creating PR? (Decision: Yes, run `openspec validate --strict`)
- Should we support multiple file commits or squash? (Decision: Single commit per PR for simplicity)
