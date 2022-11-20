import { useRemarkSync } from "react-remark";
import { LeadParagraphOptions, rehypeLeadParagraph } from "./leadParagraph";

type MarkdownOptions = LeadParagraphOptions;

export function useMarkdown(source: string, options: MarkdownOptions) {
  return useRemarkSync(source, {
    rehypePlugins: [[rehypeLeadParagraph, options]],
  });
}
