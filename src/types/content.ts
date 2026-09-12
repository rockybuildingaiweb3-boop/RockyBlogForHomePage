/**
 * Core domain types for multilingual IT technical blog system.
 * Astro Content Collections (`CollectionEntry<'blog'>`) is the single source of truth for articles.
 */

export type SupportedLocale = 'zh-CN' | 'en' | 'fr' | 'de' | 'ja';

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3 | 4;
}

export interface CategoryDefinition {
  id: string;
  name: Record<SupportedLocale, string>;
  description?: Record<SupportedLocale, string>;
}

export interface TagDefinition {
  id: string;
  name: Record<SupportedLocale, string>;
  description?: Record<SupportedLocale, string>;
}
