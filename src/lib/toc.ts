import { TocItem } from '../types/content';

/**
 * Extracts H2, H3, H4 headings from markdown body to generate Table of Contents (TOC).
 * Generates slugified IDs matching standard GitHub/Markdown anchors.
 */
export function extractTableOfContents(rawMarkdown: string): TocItem[] {
  const lines = rawMarkdown.split('\n');
  const toc: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const depth = match[1].length as 2 | 3 | 4;
      const text = match[2].replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*_`]/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fa5\u3040-\u30ff-]/g, '')
        .replace(/\s+/g, '-');

      if (text && id) {
        toc.push({ id, text, depth });
      }
    }
  }

  return toc;
}
