import imgAltEmptyWhenAriaHidden from "./rules/img-alt-empty-when-aria-hidden.js";
import ariaLabelFromTitle from "./rules/aria-label-from-title.js";

const plugin = {
  rules: {
    "img-alt-empty-when-aria-hidden": imgAltEmptyWhenAriaHidden,
    "aria-label-from-title": ariaLabelFromTitle
  },
  configs: {
    recommended: {
      plugins: ["a11y-safe"],
      rules: {
        "a11y-safe/img-alt-empty-when-aria-hidden": "error",
        "a11y-safe/aria-label-from-title": "error"
      }
    }
  }
};

export default plugin;
