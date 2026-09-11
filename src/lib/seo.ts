import { siteConfig } from '../config/site.config';
import type { ArticleRecord, SupportedLocale } from '../types/content';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  hreflangs: Array<{ lang: SupportedLocale | 'x-default'; href: string }>;
  ogImage: string;
  ogType: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateArticleSeo(
  article: ArticleRecord,
  allTranslations: Partial<Record<SupportedLocale, ArticleRecord>>
): SeoMetadata {
  const currentLang = article.frontmatter.lang;
  const canonicalUrl = article.frontmatter.canonicalUrl || `${siteConfig.siteUrl}/${currentLang.toLowerCase()}/blog/${article.frontmatter.slug}`;

  // Build hreflangs only for genuinely existing translations of this translationId
  const hreflangs: Array<{ lang: SupportedLocale | 'x-default'; href: string }> = [];

  for (const locale of siteConfig.supportedLocales) {
    const translated = allTranslations[locale];
    if (translated && !translated.frontmatter.draft) {
      hreflangs.push({
        lang: locale,
        href: `${siteConfig.siteUrl}/${locale.toLowerCase()}/blog/${translated.frontmatter.slug}`,
      });
    }
  }

  // Set x-default to defaultLocale (zh-CN) if available, otherwise first existing
  const defaultVersion = allTranslations[siteConfig.defaultLocale] || article;
  hreflangs.push({
    lang: 'x-default',
    href: `${siteConfig.siteUrl}/${defaultVersion.frontmatter.lang.toLowerCase()}/blog/${defaultVersion.frontmatter.slug}`,
  });

  return {
    title: `${article.frontmatter.title} — ${siteConfig.siteName[currentLang]}`,
    description: article.frontmatter.description,
    canonicalUrl,
    hreflangs,
    ogImage: article.frontmatter.cover.startsWith('http')
      ? article.frontmatter.cover
      : `${siteConfig.siteUrl}${article.frontmatter.cover.replace(/^\./, '')}`,
    ogType: 'article',
    publishedTime: article.frontmatter.pubDate,
    modifiedTime: article.frontmatter.updatedDate || article.frontmatter.pubDate,
  };
}

export function generatePageSeo(
  locale: SupportedLocale,
  pagePath: string,
  customTitle?: string,
  customDescription?: string
): SeoMetadata {
  const hreflangs: Array<{ lang: SupportedLocale | 'x-default'; href: string }> = siteConfig.supportedLocales.map(
    (loc) => ({
      lang: loc,
      href: `${siteConfig.siteUrl}/${loc.toLowerCase()}${pagePath}`,
    })
  );

  hreflangs.push({
    lang: 'x-default',
    href: `${siteConfig.siteUrl}/${siteConfig.defaultLocale.toLowerCase()}${pagePath}`,
  });

  return {
    title: customTitle ? `${customTitle} — ${siteConfig.siteName[locale]}` : siteConfig.siteName[locale],
    description: customDescription || siteConfig.siteDescription[locale],
    canonicalUrl: `${siteConfig.siteUrl}/${locale.toLowerCase()}${pagePath}`,
    hreflangs,
    ogImage: siteConfig.author.avatar,
    ogType: 'website',
  };
}
