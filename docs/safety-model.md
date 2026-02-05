# Safety Model

**What we will never do**
- Guess or generate descriptive alt text.
- Rewrite non-HTML files or JSX templates.
- Apply fixes without `--write`.

**When we refuse to fix**
- If no files match your globs.
- If the file extension is not in `--extensions`.

**Preview changes**
- Run with `--check` and `--json` to review output.

**Rollback**
- Since changes are deterministic and local, `git checkout -- <file>` fully reverts.
