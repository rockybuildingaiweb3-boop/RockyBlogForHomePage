import type { CollectionEntry } from 'astro:content';
import type { SupportedLocale } from '../types/content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Filter only published entries (draft: false)
 */
export function filterPublished(entries: BlogPost[]): BlogPost[] {
  return entries.filter((entry) => !entry.data.draft);
}

/**
 * Get articles for a specific locale, sorted by pubDate descending.
 */
export function getArticlesByLocale(
  entries: BlogPost[],
  locale: SupportedLocale,
  includeDrafts = false
): BlogPost[] {
  return entries
    .filter((entry) => entry.data.lang === locale && (includeDrafts || !entry.data.draft))
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
}

/**
 * Get an article by its localized slug and language.
 */
export function getArticleBySlug(
  entries: BlogPost[],
  locale: SupportedLocale,
  slug: string
): BlogPost | undefined {
  const normalizedSlug = slug.toLowerCase();
  return entries.find(
    (entry) =>
      entry.data.lang === locale &&
      entry.data.slug.toLowerCase() === normalizedSlug &&
      !entry.data.draft
  );
}

/**
 * Get featured articles for a locale.
 */
export function getFeaturedArticles(
  entries: BlogPost[],
  locale: SupportedLocale,
  limit = 3
): BlogPost[] {
  return entries
    .filter((entry) => entry.data.lang === locale && entry.data.featured && !entry.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())
    .slice(0, limit);
}

/**
 * Get the latest articles for a locale.
 */
export function getLatestArticles(
  entries: BlogPost[],
  locale: SupportedLocale,
  limit = 6
): BlogPost[] {
  return getArticlesByLocale(entries, locale, false).slice(0, limit);
}

/**
 * Get articles for a specific category within a locale.
 */
export function getArticlesByCategory(
  entries: BlogPost[],
  locale: SupportedLocale,
  categoryId: string
): BlogPost[] {
  const normCat = categoryId.toLowerCase();
  return entries
    .filter(
      (entry) =>
        entry.data.lang === locale &&
        !entry.data.draft &&
        entry.data.category.toLowerCase() === normCat
    )
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
}

/**
 * Get articles for a specific tag within a locale.
 */
export function getArticlesByTag(
  entries: BlogPost[],
  locale: SupportedLocale,
  tag: string
): BlogPost[] {
  const normTag = tag.toLowerCase();
  return entries
    .filter(
      (entry) =>
        entry.data.lang === locale &&
        !entry.data.draft &&
        entry.data.tags.some((t) => t.toLowerCase() === normTag)
    )
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
}

/**
 * Get all available translations for a given translationId.
 */
export function getTranslationsForArticle(
  entries: BlogPost[],
  translationId: string
): Partial<Record<SupportedLocale, BlogPost>> {
  const translations: Partial<Record<SupportedLocale, BlogPost>> = {};
  for (const entry of entries) {
    if (entry.data.translationId === translationId && !entry.data.draft) {
      translations[entry.data.lang] = entry;
    }
  }
  return translations;
}

/**
 * Get related articles for a given article according to BLOG_REQUIREMENTS Section 19:
 * 1. Only recommend articles in the same language.
 * 2. Exclude the current article itself.
 * 3. Exclude drafts.
 * 4. Priority scoring:
 *    - Matching tags (+3 points per tag)
 *    - Matching category (+2 points)
 *    - Tie-breaker: pubDate descending
 */
export function getRelatedArticles(
  current: BlogPost,
  allEntries: BlogPost[],
  limit = 3
): BlogPost[] {
  const currentLang = current.data.lang;
  const currentSlug = current.data.slug;
  const currentTags = new Set(current.data.tags.map((t) => t.toLowerCase()));
  const currentCat = current.data.category.toLowerCase();

  const candidates = allEntries.filter(
    (entry) =>
      entry.data.lang === currentLang &&
      entry.data.slug !== currentSlug &&
      !entry.data.draft
  );

  const scored = candidates.map((entry) => {
    let score = 0;
    for (const tag of entry.data.tags) {
      if (currentTags.has(tag.toLowerCase())) {
        score += 3;
      }
    }
    if (entry.data.category.toLowerCase() === currentCat) {
      score += 2;
    }
    return { entry, score };
  });

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.entry.data.pubDate).getTime() - new Date(a.entry.data.pubDate).getTime();
    })
    .slice(0, limit)
    .map((s) => s.entry);
}

/**
 * Get adjacent (previous and next) articles according to BLOG_REQUIREMENTS Section 20:
 * - Only within published articles of the same language
 * - Ordered chronologically by pubDate descending
 * - previous: older article (index + 1)
 * - next: newer article (index - 1)
 */
export function getAdjacentArticles(
  current: BlogPost,
  allEntries: BlogPost[]
): { previous?: BlogPost; next?: BlogPost } {
  const published = getArticlesByLocale(allEntries, current.data.lang, false);
  const index = published.findIndex((entry) => entry.data.slug === current.data.slug);

  if (index === -1) return {};

  return {
    previous: index < published.length - 1 ? published[index + 1] : undefined,
    next: index > 0 ? published[index - 1] : undefined,
  };
}

/**
 * Group published articles of a given locale by year descending.
 */
export function getArchiveByYear(
  entries: BlogPost[],
  locale: SupportedLocale
): Map<number, BlogPost[]> {
  const published = getArticlesByLocale(entries, locale, false);
  const archiveMap = new Map<number, BlogPost[]>();

  for (const article of published) {
    const year = new Date(article.data.pubDate).getFullYear();
    if (!archiveMap.has(year)) {
      archiveMap.set(year, []);
    }
    archiveMap.get(year)!.push(article);
  }

  return new Map([...archiveMap.entries()].sort((a, b) => b[0] - a[0]));
}

/**
 * Validate content integrity across all entries at build time:
 * - No duplicate (lang, slug)
 * - No duplicate (translationId, lang)
 */
export function validateContentIntegrity(entries: BlogPost[]): void {
  const seenLangSlug = new Set<string>();
  const seenTranslationLang = new Set<string>();

  for (const entry of entries) {
    const langSlugKey = `${entry.data.lang}:${entry.data.slug.toLowerCase()}`;
    if (seenLangSlug.has(langSlugKey)) {
      throw new Error(
        `[Content Integrity Error] Duplicate slug for language "${entry.data.lang}": "${entry.data.slug}"`
      );
    }
    seenLangSlug.add(langSlugKey);

    const transLangKey = `${entry.data.translationId}:${entry.data.lang}`;
    if (seenTranslationLang.has(transLangKey)) {
      throw new Error(
        `[Content Integrity Error] Duplicate translationId for language "${entry.data.lang}": "${entry.data.translationId}"`
      );
    }
    seenTranslationLang.add(transLangKey);
  }
}
