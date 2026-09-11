/**
 * Core types for multilingual content model and relationships.
 * Single Source of Truth: BLOG_REQUIREMENTS.md
 */

export type SupportedLocale = 'zh-CN' | 'en' | 'fr' | 'de' | 'ja';

export interface ExternalLink {
  platform: string;
  url: string;
  type: 'announcement' | 'full-post' | 'adapted';
}

export interface ImageCredit {
  author?: string;
  source?: string;
  url?: string;
}

export interface ArticleFrontmatter {
  // Required fields per BLOG_REQUIREMENTS.md Section 5.1
  title: string;
  description: string;
  pubDate: string; // ISO format: YYYY-MM-DD
  slug: string;
  translationId: string;
  lang: SupportedLocale;
  category: string;
  tags: string[];
  cover: string;
  featured: boolean;
  draft: boolean;

  // Optional fields per Section 5.2
  updatedDate?: string;
  author?: string;
  canonicalUrl?: string;
  links?: ExternalLink[];
  coverCredit?: ImageCredit;
}

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3 | 4;
}

export interface ArticleRecord {
  frontmatter: ArticleFrontmatter;
  rawBody: string;
  readingTimeMinutes: number;
  wordCount: number;
  toc: TocItem[];
  canonicalPath: string;
  filePath: string;
  availableLocales: SupportedLocale[];
}

export interface LogicalArticle {
  translationId: string;
  translations: Partial<Record<SupportedLocale, ArticleRecord>>;
}

export interface CategoryDefinition {
  id: string;
  name: Record<SupportedLocale, string>;
  description?: Record<SupportedLocale, string>;
}

export interface TagDefinition {
  id: string;
  name: Record<SupportedLocale, string>;
}
