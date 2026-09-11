import { ArticleFrontmatterSchema } from '../schema/content.schema';
import {
  ArticleFrontmatter,
  ArticleRecord,
  LogicalArticle,
  SupportedLocale,
} from '../types/content';
import { validateArticleIntegrity } from './imageIntegrity';
import { calculateReadingMetrics } from './readingTime';
import { extractTableOfContents } from './toc';

export interface RawContentFile {
  filePath: string;
  rawText: string;
}

/**
 * Parses raw frontmatter block from a Markdown/MDX string.
 */
export function parseRawFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    throw new Error('Missing valid YAML frontmatter block starting and ending with ---');
  }

  const rawYaml = match[1];
  const content = match[2];
  const data: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey = '';
  let inArray = false;
  let arrayValues: any[] = [];
  let inObjectArray = false;
  let currentObject: Record<string, any> | null = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // Check if line is an array item for an object list (like links:)
    if (inObjectArray) {
      if (line.match(/^\s+-\s+([a-zA-Z0-9_-]+):\s*(.*)$/)) {
        if (currentObject) arrayValues.push(currentObject);
        currentObject = {};
        const objMatch = line.match(/^\s+-\s+([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (objMatch) {
          currentObject[objMatch[1]] = parseYamlValue(objMatch[2]);
        }
        continue;
      } else if (line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/)) {
        const objMatch = line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/);
        if (objMatch && currentObject) {
          currentObject[objMatch[1]] = parseYamlValue(objMatch[2]);
        }
        continue;
      } else {
        // End of object array
        if (currentObject) arrayValues.push(currentObject);
        data[currentKey] = arrayValues;
        inObjectArray = false;
        currentObject = null;
      }
    }

    // Check if line is a simple array item (like tags: \n  - react)
    if (inArray) {
      const arrMatch = line.match(/^\s*-\s+(.*)$/);
      if (arrMatch) {
        arrayValues.push(parseYamlValue(arrMatch[1]));
        continue;
      } else {
        data[currentKey] = arrayValues;
        inArray = false;
      }
    }

    // Key-value line
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const valStr = kvMatch[2].trim();

      if (valStr === '') {
        // Next lines will be array or nested object
        currentKey = key;
        arrayValues = [];
        // Peek if it might be an object array or simple array
        if (key === 'links') {
          inObjectArray = true;
          currentObject = null;
        } else {
          inArray = true;
        }
      } else {
        data[key] = parseYamlValue(valStr);
      }
    }
  }

  if (inObjectArray && currentObject) {
    arrayValues.push(currentObject);
    data[currentKey] = arrayValues;
  } else if (inArray) {
    data[currentKey] = arrayValues;
  }

  return { data, content };
}

function parseYamlValue(str: string): any {
  const trimmed = str.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
  // Strip outer quotes if any
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Validates, indexes and establishes cross-language relationships for all articles.
 */
export class ContentRepository {
  private articles: ArticleRecord[] = [];
  private logicalMap: Map<string, LogicalArticle> = new Map();
  private validationErrors: string[] = [];

  constructor(rawFiles: RawContentFile[]) {
    this.indexContent(rawFiles);
  }

  private indexContent(rawFiles: RawContentFile[]) {
    const records: ArticleRecord[] = [];

    for (const file of rawFiles) {
      try {
        const { data, content } = parseRawFrontmatter(file.rawText);
        const parsedFrontmatter = ArticleFrontmatterSchema.parse(data) as ArticleFrontmatter;

        // Verify images and content integrity
        const integrity = validateArticleIntegrity(parsedFrontmatter, content, file.filePath);
        if (!integrity.valid) {
          this.validationErrors.push(...integrity.errors);
        }

        const metrics = calculateReadingMetrics(content, parsedFrontmatter.lang);
        const toc = extractTableOfContents(content);
        const canonicalPath = `/${parsedFrontmatter.lang.toLowerCase()}/blog/${parsedFrontmatter.slug}`;

        records.push({
          frontmatter: parsedFrontmatter,
          rawBody: content,
          readingTimeMinutes: metrics.minutes,
          wordCount: metrics.count,
          toc,
          canonicalPath,
          filePath: file.filePath,
          availableLocales: [],
        });
      } catch (err: any) {
        this.validationErrors.push(`[${file.filePath}] Frontmatter error: ${err.message}`);
      }
    }

    // Group into LogicalArticles by translationId
    for (const record of records) {
      const tId = record.frontmatter.translationId;
      if (!this.logicalMap.has(tId)) {
        this.logicalMap.set(tId, {
          translationId: tId,
          translations: {},
        });
      }
      const logical = this.logicalMap.get(tId)!;
      logical.translations[record.frontmatter.lang] = record;
    }

    // Populate availableLocales array for each record
    for (const record of records) {
      const logical = this.logicalMap.get(record.frontmatter.translationId);
      if (logical) {
        record.availableLocales = Object.keys(logical.translations) as SupportedLocale[];
      }
    }

    this.articles = records;
  }

  public getValidationErrors(): string[] {
    return this.validationErrors;
  }

  public getAllArticles(includeDrafts = false): ArticleRecord[] {
    if (includeDrafts) return this.articles;
    return this.articles.filter((a) => !a.frontmatter.draft);
  }

  public getArticlesByLocale(locale: SupportedLocale, includeDrafts = false): ArticleRecord[] {
    return this.getAllArticles(includeDrafts)
      .filter((a) => a.frontmatter.lang === locale)
      .sort((a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime());
  }

  public getArticleBySlug(locale: SupportedLocale, slug: string): ArticleRecord | undefined {
    return this.getAllArticles(false).find(
      (a) => a.frontmatter.lang === locale && a.frontmatter.slug.toLowerCase() === slug.toLowerCase()
    );
  }

  public getLogicalArticle(translationId: string): LogicalArticle | undefined {
    return this.logicalMap.get(translationId);
  }

  public getAllLogicalArticles(): LogicalArticle[] {
    return Array.from(this.logicalMap.values());
  }

  public getFeaturedArticles(locale: SupportedLocale, limit = 4): ArticleRecord[] {
    return this.getArticlesByLocale(locale, false)
      .filter((a) => a.frontmatter.featured)
      .slice(0, limit);
  }

  public getLatestArticles(locale: SupportedLocale, limit = 6): ArticleRecord[] {
    return this.getArticlesByLocale(locale, false).slice(0, limit);
  }

  public getArticlesByCategory(locale: SupportedLocale, categoryId: string): ArticleRecord[] {
    return this.getArticlesByLocale(locale, false).filter(
      (a) => a.frontmatter.category.toLowerCase() === categoryId.toLowerCase()
    );
  }

  public getArticlesByTag(locale: SupportedLocale, tag: string): ArticleRecord[] {
    return this.getArticlesByLocale(locale, false).filter((a) =>
      a.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }

  /**
   * Deterministic recommendation: Same Tags -> Same Category -> Publication Date.
   * Only returns articles existing in the current locale.
   */
  public getRelatedArticles(current: ArticleRecord, limit = 3): ArticleRecord[] {
    const localeArticles = this.getArticlesByLocale(current.frontmatter.lang, false).filter(
      (a) => a.frontmatter.slug !== current.frontmatter.slug
    );

    const scored = localeArticles.map((article) => {
      let score = 0;
      // Tag matches
      const currentTags = new Set(current.frontmatter.tags.map((t) => t.toLowerCase()));
      for (const t of article.frontmatter.tags) {
        if (currentTags.has(t.toLowerCase())) score += 3;
      }
      // Category match
      if (article.frontmatter.category.toLowerCase() === current.frontmatter.category.toLowerCase()) {
        score += 2;
      }
      return { article, score };
    });

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.article.frontmatter.pubDate).getTime() - new Date(a.article.frontmatter.pubDate).getTime();
      })
      .slice(0, limit)
      .map((item) => item.article);
  }

  /**
   * Adjacent articles (Previous & Next) based on chronological order of existing locale versions.
   */
  public getAdjacentArticles(current: ArticleRecord): {
    previous?: ArticleRecord;
    next?: ArticleRecord;
  } {
    const localeArticles = this.getArticlesByLocale(current.frontmatter.lang, false);
    const index = localeArticles.findIndex((a) => a.frontmatter.slug === current.frontmatter.slug);

    if (index === -1) return {};

    // localeArticles is sorted DESC (newest first)
    // "previous" piece is older (index + 1)
    // "next" piece is newer (index - 1)
    return {
      next: index > 0 ? localeArticles[index - 1] : undefined,
      previous: index < localeArticles.length - 1 ? localeArticles[index + 1] : undefined,
    };
  }

  /**
   * Year & Month archive grouping for the given locale.
   */
  public getArchiveByYear(locale: SupportedLocale): Map<number, ArticleRecord[]> {
    const articles = this.getArticlesByLocale(locale, false);
    const groups = new Map<number, ArticleRecord[]>();

    for (const article of articles) {
      const year = new Date(article.frontmatter.pubDate).getFullYear();
      if (!groups.has(year)) {
        groups.set(year, []);
      }
      groups.get(year)!.push(article);
    }

    return groups;
  }
}
