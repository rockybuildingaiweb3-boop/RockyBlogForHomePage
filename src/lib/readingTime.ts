import type { SupportedLocale } from '../types/content';

/**
 * Calculates reading time and word count tailored to Western vs CJK languages.
 * Western languages: ~200 words per minute.
 * CJK languages (Chinese, Japanese): ~350-380 characters per minute.
 * Excludes: frontmatter, code blocks, MDX import/exports, JSX/MDX tags, markdown images, and urls.
 */
export function calculateReadingMetrics(text: string, locale: SupportedLocale): { minutes: number; count: number } {
  const cleanText = text
    .replace(/^---[\s\S]*?---/, '') // strip frontmatter
    .replace(/^import\s+[\s\S]*?;\s*$/gm, '') // strip MDX imports
    .replace(/^export\s+[\s\S]*?;\s*$/gm, '') // strip MDX exports
    .replace(/```[\s\S]*?```/g, '') // strip multi-line code blocks
    .replace(/`[^`]*?`/g, '') // strip inline code
    .replace(/<\/?[a-zA-Z][\s\S]*?>/g, '') // strip HTML and MDX component tags (e.g. <Figure ... />)
    .replace(/!\[.*?\]\(.*?\)/g, '') // strip Markdown images
    .replace(/\[([^\]]*?)\]\(.*?\)/g, '$1') // keep Markdown link label text only
    .replace(/[#*~_>|]/g, ' ') // strip markdown formatting symbols
    .trim();

  if (locale === 'zh-CN' || locale === 'ja') {
    // CJK character class: Chinese characters, Hiragana, Katakana, CJK punctuation
    const cjkChars = (cleanText.match(/[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    // Count any standalone non-CJK Latin words
    const latinWords = (cleanText.replace(/[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff]/g, ' ').match(/\b[\w'-]+\b/g) || []).length;
    const totalCount = cjkChars + latinWords;
    const speed = locale === 'zh-CN' ? 350 : 380;
    const minutes = Math.max(1, Math.ceil(totalCount / speed));
    return { minutes, count: totalCount };
  } else {
    // Western word count (English, French, German)
    const words = (cleanText.match(/\b[\w'-]+\b/g) || []).length;
    const speed = 200;
    const minutes = Math.max(1, Math.ceil(words / speed));
    return { minutes, count: words };
  }
}
