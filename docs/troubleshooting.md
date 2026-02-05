# Troubleshooting

- **No files matched**: Check `--paths` and `--extensions`.
- **No fixes applied**: You are likely in dry-run mode; add `--write`.
- **Unexpected changes**: The tool only modifies `<img>` tags missing `alt`.
- **CI failed with exit 2**: Run without `--check` to preview issues.
- **Parsing quirks**: The fixer is regex-based; report edge cases in Issues.
