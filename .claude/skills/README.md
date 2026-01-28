# Claude Code Skills

This directory contains project-specific skills that provide Claude with domain knowledge and best practices for this codebase.

## Available Skills

### Local Skills (Project-Specific)

| Skill | Description |
|-------|-------------|
| [systematic-debugging](./systematic-debugging/SKILL.md) | Four-phase debugging methodology with root cause analysis |
| [testing-patterns](./testing-patterns/SKILL.md) | Jest testing patterns, factory functions, mocking strategies, TDD workflow |

### External Skills (from skills.sh)

| Skill | Source | Description |
|-------|--------|-------------|
| [test-driven-development](./test-driven-development/SKILL.md) | obra/superpowers | Structured TDD red-green-refactor workflow with explicit phases |
| [verification-before-completion](./verification-before-completion/SKILL.md) | obra/superpowers | Quality gates and checklists before marking tasks complete |
| [webapp-testing](./webapp-testing/SKILL.md) | anthropics/skills | Web application testing patterns for DOM, interactions, accessibility |

## Skill Combinations for Common Tasks

### Debugging an Issue
1. **systematic-debugging** - Root cause analysis first
2. **testing-patterns** - Write failing test that reproduces the bug
3. Fix the root cause
4. Verify test passes

### Writing New Tests (TDD)
1. **test-driven-development** - Follow structured red-green-refactor phases
2. **testing-patterns** - Use factory patterns and Jest conventions
3. Write failing test first
4. Implement minimal code to pass
5. Refactor after green

### Fixing a Test Failure
1. **systematic-debugging** - Investigate why the test fails
2. **testing-patterns** - Understand test patterns and assertions
3. Trace to root cause
4. Fix and verify

### Completing Any Task
1. Complete the implementation
2. **verification-before-completion** - Run quality checklist before marking done
3. Ensure tests pass, no lint errors, code reviewed

### Testing Web UI
1. **webapp-testing** - Apply web testing patterns
2. **testing-patterns** - Use Jest/factory patterns
3. Test DOM interactions and user workflows
4. Cover accessibility requirements

## How Skills Work

Skills are automatically invoked when Claude recognizes relevant context. Each skill provides:

- **When to Use** - Trigger conditions
- **Core Patterns** - Best practices and examples
- **Anti-Patterns** - What to avoid
- **Integration** - How skills connect

## Adding New Skills

### From skills.sh (Recommended)

```bash
# Search for skills
npx skills find <query>

# Install a skill
npx skills add <owner/repo> -s <skill-name> -y
```

### Manual Skills

1. Create directory: `.claude/skills/skill-name/`
2. Add `SKILL.md` (case-sensitive) with YAML frontmatter:
   ```yaml
   ---
   name: skill-name              # Lowercase, hyphens, max 64 chars
   description: What it does and when to use it. Include trigger keywords.
   ---
   ```
3. Include standard sections: Core Patterns, Anti-Patterns, Integration
4. Add to this README

**Important:** The `description` field is critical—Claude uses semantic matching on it to decide when to apply the skill. Include keywords users would naturally mention.

## Maintenance

- Update skills when patterns change
- Remove outdated information
- Add new patterns as they emerge
- Keep examples current with codebase
- Run `npx skills check` to check for skill updates
- Run `npx skills update` to update external skills
