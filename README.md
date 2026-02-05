<picture>
  <source srcset="branding/hero.svg" type="image/svg+xml">
  <img alt="a11y-safe-autofix hero" src="branding/hero.png" width="100%">
</picture>

# A11y Safe Autofix
Apply conservative, low-risk accessibility fixes with a dry-run first. Dry-run safe fixes, then apply deterministic changes.

![CI](https://github.com/PetriLahdelma/a11y-safe-autofix/actions/workflows/ci.yml/badge.svg) ![Release](https://img.shields.io/github/v/release/PetriLahdelma/a11y-safe-autofix) ![License](https://img.shields.io/github/license/PetriLahdelma/a11y-safe-autofix) ![Stars](https://img.shields.io/github/stars/PetriLahdelma/a11y-safe-autofix)

> [!IMPORTANT]
> Dry-run mode is default. Use `--write` only after reviewing the report.

## Quickstart
```bash
npx a11y-safe-autofix --paths .
```

## Demo
![Terminal Demo](branding/screenshots/terminal-demo.svg)

```bash
a11y-safe-autofix --paths src --check
```

## Docs
Start here: [Requirements](#requirements) · [Usage](#usage) · [Output](#output) · [Exit Codes](#exit-codes) · [Safe Fixes (Current)](#safe-fixes-current) · [Troubleshooting](#troubleshooting)

## Contributing
See `CONTRIBUTING.md`.

## Requirements

- Node.js 20+

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

## License

MIT

