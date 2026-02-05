# Usage

```bash
a11y-safe-autofix --paths src
a11y-safe-autofix --paths src --write
a11y-safe-autofix --paths . --check --json
```

**Options**

- `--paths <globs>` Comma-separated paths or glob patterns (default `.`).
- `--extensions <list>` Comma-separated extensions (default `html,htm`).
- `--write` Write fixes to disk (default is dry-run).
- `--dry-run` Do not modify files (default).
- `--check` Exit `2` if issues are found.
- `--json` Emit machine-readable JSON.
