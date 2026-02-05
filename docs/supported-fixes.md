# Supported Fixes

| Rule | Fix Strategy | Safe Conditions | Example |
| --- | --- | --- | --- |
| `img-alt` | Add `alt=""` | When `<img>` lacks any `alt` attribute | `<img src="hero.jpg">` → `<img src="hero.jpg" alt="">` |
