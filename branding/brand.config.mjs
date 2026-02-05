export default {
  name: "a11y-safe-autofix",
  tagline: "Apply conservative, low-risk accessibility fixes with a dry-run first.",
  value: "Dry-run safe fixes, then apply deterministic changes.",
  accent: "#F59E0B",
  pills: ["Dry-run default","Safe fixes","CI exit codes"],
  demo: ["$ a11y-safe-autofix --paths src --check","Issues found: 2 (img-alt)","Run with --write to apply fixes","Exit 2 when issues are found"],
  callout: "Dry-run mode is default. Use `--write` only after reviewing the report.",
  quickstart: "npx a11y-safe-autofix --paths .",
  hero: { width: 1600, height: 900 },
  heroAccent: "none",
  icon: {
    inner: `
<path d="M256 104 L148 148 V268 C148 338 200 388 256 408 C312 388 364 338 364 268 V148 Z" stroke="{{accent}}" stroke-width="{{stroke}}" stroke-linejoin="round"/>
<circle cx="256" cy="224" r="26" stroke="{{accent}}" stroke-width="{{stroke}}"/>
<line x1="256" y1="250" x2="256" y2="304" stroke="{{accent}}" stroke-width="{{stroke}}" stroke-linecap="round"/>
<path d="M188 292 Q256 338 324 292" stroke="{{accent}}" stroke-width="{{stroke}}" stroke-linecap="round" stroke-linejoin="round"/>
`
  }
};
