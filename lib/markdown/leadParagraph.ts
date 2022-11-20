import { classnames } from "hast-util-classnames";
import { EXIT, visit } from "unist-util-visit";
import type { Test } from "unist-util-visit";
import type { Plugin } from "unified";

export interface LeadParagraphOptions {
  leadClass: string;
}

export const rehypeLeadParagraph: Plugin = (
  options: Partial<LeadParagraphOptions> = {}
) => {
  return (tree) => {
    const isParagraph: Test = {
      type: "element",
      tagName: "p",
    };

    visit(tree, "root", (node) => {
      visit(node, isParagraph, (node, index) => {
        if (index === 0) {
          classnames(node, options.leadClass || "");
          return EXIT;
        }
      });
    });
  };
};
