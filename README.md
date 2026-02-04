# a11y-safe-autofix

Deterministic, provably-safe accessibility fixes for React/TSX.

Tagline: Only the fixes that cannot make your UI worse.

## Quickstart
```bash
npx a11y-safe-autofix --check src
```

## Demo
```bash
a11y-safe-autofix --apply src
```
Expected output:
```
2 file(s) checked, 1 fix applied
```

## Screenshots
Placeholder: add screenshots in `docs/` and link them here.

## What it does
- ESLint plugin with a small set of safe, deterministic fixes
- CLI for check mode (CI) and apply mode (local)
- Rule docs and examples included

## CLI
```bash
a11y-safe-autofix --check <paths>
a11y-safe-autofix --apply <paths>
```
Options:
- `--check` (default)
- `--apply`
- `--ext .ts,.tsx,.jsx`
- `--config <path>` (JSON with rule overrides)

## ESLint usage
```js
import a11ySafe from "a11y-safe-autofix";

export default [
  {
    plugins: { "a11y-safe": a11ySafe },
    rules: {
      "a11y-safe/img-alt-empty-when-aria-hidden": "error",
      "a11y-safe/aria-label-from-title": "error"
    }
  }
];
```

## Manual publish steps (optional)
```bash
npm login
npm publish --access public
```
If the name is taken, consider scoped naming like `@petri-lahdelma/a11y-safe-autofix`.

## License
MIT
