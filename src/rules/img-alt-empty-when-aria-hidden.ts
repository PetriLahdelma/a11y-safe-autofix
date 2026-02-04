import type { Rule } from "eslint";

function getAttr(node: any, name: string): any | undefined {
  return node.attributes?.find((a: any) => a?.type === "JSXAttribute" && a.name?.name === name);
}

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Add alt=\"\" when img has aria-hidden=\"true\" and no alt"
    },
    fixable: "code",
    schema: [],
    messages: {
      addAlt: "Add alt=\"\" for decorative images."
    }
  },
  create(context) {
    const source = context.getSourceCode();
    return {
      JSXOpeningElement(node: any) {
        if (node.name?.name !== "img") return;
        if (getAttr(node, "alt")) return;
        const ariaHidden = getAttr(node, "aria-hidden");
        const value = ariaHidden?.value?.value;
        if (value !== "true") return;
        context.report({
          node,
          messageId: "addAlt",
          fix(fixer) {
            const insertPos = node.name.range[1];
            return fixer.insertTextAfterRange([node.name.range[0], insertPos], " alt=\"\"");
          }
        });
      }
    };
  }
};

export default rule;
