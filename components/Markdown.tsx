import { useMarkdown } from "../lib/markdown";

type MarkdownProps = {
  source: string;
};

export function Markdown({ source }: MarkdownProps) {
  const formattedContent = useMarkdown(source, { leadClass: "lead" });

  return formattedContent;
}
