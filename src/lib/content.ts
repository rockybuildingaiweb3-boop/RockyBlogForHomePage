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
 * Check if a date string is a valid calendar date in YYYY-MM-DD format (avoids 2026-99-99 etc.)
 */
function isValidCalendarDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

/**
 * Check if a URL string is a valid absolute http(s) URL
 */
function isValidAbsoluteUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate content integrity across all entries at build time per Section 14:
 * 1. Duplicate (lang, slug)
 * 2. Duplicate (translationId, lang)
 * 3. Valid locale (zh-CN, en, fr, de, ja)
 * 4. Slug format (lowercase a-z, 0-9, hyphen)
 * 5. Real calendar date for pubDate
 * 6. Real calendar date for updatedDate and updatedDate >= pubDate
 * 7. Valid absolute URL for canonicalUrl if provided
 * 8. Valid external links (platform, url, type)
 */
export function validateContentIntegrity(entries: BlogPost[]): void {
  const seenLangSlug = new Set<string>();
  const seenTranslationLang = new Set<string>();
  const validLocales = new Set(['zh-CN', 'en', 'fr', 'de', 'ja']);
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const entry of entries) {
    const { lang, slug, translationId, pubDate, updatedDate, canonicalUrl, links } = entry.data;

    // 1. Valid locale
    if (!validLocales.has(lang)) {
      throw new Error(
        `[Content Integrity Error] Invalid locale "${lang}" in entry "${entry.id}". Must be one of: zh-CN, en, fr, de, ja`
      );
    }

    // 2. Slug format
    if (!slugRegex.test(slug)) {
      throw new Error(
        `[Content Integrity Error] Invalid slug format "${slug}" in entry "${entry.id}". Slugs must be lowercase alphanumeric and hyphens only (e.g. "my-first-post").`
      );
    }

    // 3. Duplicate (lang, slug)
    const langSlugKey = `${lang}:${slug}`;
    if (seenLangSlug.has(langSlugKey)) {
      throw new Error(
        `[Content Integrity Error] Duplicate slug for language "${lang}": "${slug}" in entry "${entry.id}"`
      );
    }
    seenLangSlug.add(langSlugKey);

    // 4. Duplicate (translationId, lang)
    const transLangKey = `${translationId}:${lang}`;
    if (seenTranslationLang.has(transLangKey)) {
      throw new Error(
        `[Content Integrity Error] Duplicate translationId "${translationId}" for language "${lang}" in entry "${entry.id}"`
      );
    }
    seenTranslationLang.add(transLangKey);

    // 5. Calendar date validity for pubDate
    if (!isValidCalendarDate(pubDate)) {
      throw new Error(
        `[Content Integrity Error] Invalid pubDate "${pubDate}" in entry "${entry.id}". Must be a valid calendar date in YYYY-MM-DD format.`
      );
    }

    // 6. Calendar date validity for updatedDate and chronological constraint
    if (updatedDate) {
      if (!isValidCalendarDate(updatedDate)) {
        throw new Error(
          `[Content Integrity Error] Invalid updatedDate "${updatedDate}" in entry "${entry.id}". Must be a valid calendar date in YYYY-MM-DD format.`
        );
      }
      if (updatedDate < pubDate) {
        throw new Error(
          `[Content Integrity Error] updatedDate ("${updatedDate}") cannot precede pubDate ("${pubDate}") in entry "${entry.id}".`
        );
      }
    }

    // 7. Canonical URL validity
    if (canonicalUrl && canonicalUrl.trim().length > 0) {
      if (!isValidAbsoluteUrl(canonicalUrl.trim())) {
        throw new Error(
          `[Content Integrity Error] Invalid canonicalUrl "${canonicalUrl}" in entry "${entry.id}". Must be a valid absolute URL with http: or https: scheme.`
        );
      }
    }

    // 8. External links validation
    if (links && Array.isArray(links)) {
      for (const link of links) {
        if (!link.platform || link.platform.trim().length === 0) {
          throw new Error(
            `[Content Integrity Error] External link missing platform in entry "${entry.id}".`
          );
        }
        if (!isValidAbsoluteUrl(link.url)) {
          throw new Error(
            `[Content Integrity Error] Invalid external link URL "${link.url}" in entry "${entry.id}".`
          );
        }
        if (!['announcement', 'full-post', 'adapted'].includes(link.type)) {
          throw new Error(
            `[Content Integrity Error] Invalid link type "${link.type}" in entry "${entry.id}".`
          );
        }
      }
    }
  }
}
