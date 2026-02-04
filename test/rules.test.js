import { RuleTester } from "eslint";
import plugin from "../dist/index.js";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: "module", ecmaFeatures: { jsx: true } }
});

ruleTester.run(
  "img-alt-empty-when-aria-hidden",
  plugin.rules["img-alt-empty-when-aria-hidden"],
  {
    valid: [
      { code: `<img alt=\"\" aria-hidden=\"true\" />` },
      { code: `<img />` }
    ],
    invalid: [
      {
        code: `<img aria-hidden=\"true\" />`,
        output: `<img alt=\"\" aria-hidden=\"true\" />`,
        errors: [{ messageId: "addAlt" }]
      }
    ]
  }
);

ruleTester.run(
  "aria-label-from-title",
  plugin.rules["aria-label-from-title"],
  {
    valid: [
      { code: `<button aria-label=\"Save\" title=\"Save\"></button>` },
      { code: `<button title=\"Save\"><span>Save</span></button>` }
    ],
    invalid: [
      {
        code: `<button title=\"Save\"></button>`,
        output: `<button aria-label=\"Save\" title=\"Save\"></button>`,
        errors: [{ messageId: "addAria" }]
      }
    ]
  }
);

console.log("rules.test.js ok");
