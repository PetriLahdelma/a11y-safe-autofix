# a11y-safe-autofix
Apply conservative, low-risk accessibility fixes with a dry-run first.

- Scans HTML files for safe autofix opportunities.
- Current fix: add `alt=""` to `<img>` tags missing an `alt` attribute.
- Dry-run by default, with clear exit codes for CI gating.

**Try in 10 seconds**
```bash
npx a11y-safe-autofix --paths .
```

**Demo**
Run once in dry-run mode, then run with `--write` to apply the same fixes.

Star if this saves you time.  
→ Buzz Kit: /buzz-kit

## Requirements

- Node.js 20+

## Quickstart

```bash
npx a11y-safe-autofix --paths .
```

## Usage

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

## Output

```json
{
  "filesChecked": 3,
  "issuesFound": 1,
  "issuesFixed": 0,
  "write": false,
  "issues": [
    {
      "file": "src/index.html",
      "line": 12,
      "column": 5,
      "rule": "img-alt",
      "message": "Image tag missing alt attribute",
      "fix": "Add alt=\"\""
    }
  ]
}
```

## Exit Codes

- `0` Success
- `1` Runtime/config error
- `2` Issues found (when `--check` is set)

## Safe Fixes (Current)

- `img-alt`: add `alt=""` to `<img>` tags without an `alt` attribute.

## Troubleshooting

- **No files matched**: Check `--paths` and `--extensions`.
- **No fixes applied**: You are likely in dry-run mode; add `--write`.
- **Unexpected changes**: The tool only modifies `<img>` tags missing `alt`.
- **CI failed with exit 2**: Run without `--check` to preview issues.
- **Parsing quirks**: The fixer is regex-based; report edge cases in Issues.

## Contributing

See `CONTRIBUTING.md` for local development.

## License

MIT
