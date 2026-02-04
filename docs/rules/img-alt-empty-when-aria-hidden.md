# img-alt-empty-when-aria-hidden

Adds `alt=""` to `<img>` elements when `aria-hidden="true"` is present and `alt` is missing.

Rationale: if an image is explicitly hidden from assistive technology, the empty alt is a safe and deterministic fix.
