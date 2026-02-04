import type { Rule } from "eslint";

function getAttr(node: any, name: string): any | undefined {
  return node.attributes?.find((a: any) => a?.type === "JSXAttribute" && a.name?.name === name);
}

function isButtonish(node: any): boolean {
  const name = node.name?.name;
  if (name === "button" || name === "a") return true;
  const role = getAttr(node, "role");
  return role?.value?.value === "button";
}

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Add aria-label from title when title is a string literal"
    },
    fixable: "code",
    schema: [],
    messages: {
      addAria: "Add aria-label from title."
    }
  },
  create(context) {
    return {
      JSXOpeningElement(node: any) {
        if (!isButtonish(node)) return;
        if (getAttr(node, "aria-label")) return;
        const title = getAttr(node, "title");
        const value = title?.value?.value;
        if (!value || typeof value !== "string") return;
        context.report({
          node,
          messageId: "addAria",
          fix(fixer) {
            const insertPos = node.name.range[1];
            return fixer.insertTextAfterRange([node.name.range[0], insertPos], ` aria-label=\"${value}\"`);
          }
        });
      }
    };
  }
};

export default rule;
