# a11y-safe-autofix

![Hero](assets/hero.png)

![CI](https://github.com/PetriLahdelma/a11y-safe-autofix/actions/workflows/ci.yml/badge.svg) ![Release](https://img.shields.io/github/v/release/PetriLahdelma/a11y-safe-autofix) ![License](https://img.shields.io/github/license/PetriLahdelma/a11y-safe-autofix) ![Stars](https://img.shields.io/github/stars/PetriLahdelma/a11y-safe-autofix)

Deterministic accessibility fixes that never guess.

## Quickstart
```bash
npx a11y-safe-autofix --check src
```

## Demo
```bash
a11y-safe-autofix --apply src
```

## Why This Exists
CI-friendly fixes with zero heuristics and no semantic risk.

## FAQ
- **Does it modify code?** Only in `--apply` mode.
- **Is it ESLint-compatible?** Yes, it is a plugin + CLI.

## Contributing
See `CONTRIBUTING.md` for rule and test guidance.

## License
MIT
