import { SupportedLocale } from '../types/content';

/**
 * Calculates reading time and word count tailored to Western vs CJK languages.
 * Western languages: ~200-220 words per minute.
 * CJK languages (Chinese, Japanese): ~300-400 characters per minute.
 */
export function calculateReadingMetrics(text: string, locale: SupportedLocale): { minutes: number; count: number } {
  // Strip Markdown syntax and HTML tags for accurate text measurement
  const cleanText = text
    .replace(/^---[\s\S]*?---/, '') // strip frontmatter
    .replace(/```[\s\S]*?```/g, '') // strip code blocks
    .replace(/`.*?`/g, '') // strip inline code
    .replace(/<[^>]+>/g, '') // strip HTML/MDX tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // strip images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // keep link text
    .replace(/[#*~_>]/g, '') // strip markdown symbols
    .trim();

  if (locale === 'zh-CN' || locale === 'ja') {
    // Count CJK characters plus any standalone western words
    const cjkChars = (cleanText.match(/[\u4e00-\u9fa5\u3040-\u30ff]/g) || []).length;
    const words = (cleanText.replace(/[\u4e00-\u9fa5\u3040-\u30ff]/g, ' ').match(/\b\w+\b/g) || []).length;
    const totalCount = cjkChars + words;
    const speed = locale === 'zh-CN' ? 350 : 380; // characters per minute
    const minutes = Math.max(1, Math.ceil(totalCount / speed));
    return { minutes, count: totalCount };
  } else {
    // Western word count (English, French, German)
    const words = (cleanText.match(/\b[\w'-]+\b/g) || []).length;
    const speed = 200; // words per minute
    const minutes = Math.max(1, Math.ceil(words / speed));
    return { minutes, count: words };
  }
}
