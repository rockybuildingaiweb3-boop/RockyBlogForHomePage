import { siteConfig } from '../config/site.config';
import type { BlogPost } from './content';
import type { SupportedLocale } from '../types/content';

/**
 * Generates an RSS 2.0 XML feed for a specific language locale.
 * Single Source of Truth: Astro Content Collections
 */
export function generateRssFeed(locale: SupportedLocale, articles: BlogPost[]): string {
  // Only published articles, sorted DESC
  const publishedArticles = articles
    .filter((a) => a.data.lang === locale && !a.data.draft)
    .sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());

  const siteTitle = siteConfig.siteName[locale];
  const siteDesc = siteConfig.siteDescription[locale];
  const feedUrl = `${siteConfig.siteUrl}/${locale}/rss.xml`;
  const siteLink = `${siteConfig.siteUrl}/${locale}`;

  const itemsXml = publishedArticles
    .map((article) => {
      const articleUrl = `${siteConfig.siteUrl}/${locale}/blog/${article.data.slug}`;
      const pubDateRfc822 = new Date(article.data.pubDate).toUTCString();
      const categoriesXml = article.data.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('');

      return `
    <item>
      <title>${escapeXml(article.data.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(article.data.description)}</description>
      <pubDate>${pubDateRfc822}</pubDate>
      <author>${escapeXml(article.data.author || siteConfig.author.name)}</author>
      ${categoriesXml}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteLink}</link>
    <description>${escapeXml(siteDesc)}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
