import { siteConfig } from '../config/site.config';
import type { ArticleRecord, LogicalArticle } from '../types/content';

/**
 * Generates an XML Sitemap with multilingual xhtml:link alternates.
 * Ensures drafts are strictly excluded.
 */
export function generateSitemapXml(
  logicalArticles: LogicalArticle[],
  articles: ArticleRecord[]
): string {
  const publishedArticles = articles.filter((a) => !a.frontmatter.draft);
  const nowIso = new Date().toISOString().split('T')[0];

  // Static standard routes
  const standardSubpaths = ['', '/blog', '/archive', '/about', '/tags'];

  const staticUrlsXml = siteConfig.supportedLocales.flatMap((locale) => {
    return standardSubpaths.map((subpath) => {
      const locUrl = `${siteConfig.siteUrl}/${locale.toLowerCase()}${subpath}`;
      const alternatesXml = siteConfig.supportedLocales
        .map(
          (altLocale) =>
            `      <xhtml:link rel="alternate" hreflang="${altLocale}" href="${siteConfig.siteUrl}/${altLocale.toLowerCase()}${subpath}" />`
        )
        .join('\n');

      return `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${subpath === '' ? '1.0' : '0.8'}</priority>
${alternatesXml}
  </url>`;
    });
  });

  // Article routes with exact logical article translation linkages
  const articleUrlsXml = publishedArticles.map((article) => {
    const locale = article.frontmatter.lang;
    const articleUrl = `${siteConfig.siteUrl}/${locale.toLowerCase()}/blog/${article.frontmatter.slug}`;
    const logical = logicalArticles.find((l) => l.translationId === article.frontmatter.translationId);

    const alternatesXml = logical
      ? Object.entries(logical.translations)
          .filter(([, trans]) => trans && !trans.frontmatter.draft)
          .map(([transLocale, trans]) => {
            const transUrl = `${siteConfig.siteUrl}/${transLocale.toLowerCase()}/blog/${trans!.frontmatter.slug}`;
            return `      <xhtml:link rel="alternate" hreflang="${transLocale}" href="${transUrl}" />`;
          })
          .join('\n')
      : '';

    return `  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${article.frontmatter.updatedDate || article.frontmatter.pubDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
${alternatesXml}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrlsXml.join('\n')}
${articleUrlsXml.join('\n')}
</urlset>`;
}
