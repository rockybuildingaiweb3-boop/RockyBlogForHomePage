import { siteConfig } from '../config/site.config';
import type { BlogPost } from './content';
import type { SupportedLocale } from '../types/content';

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
  entry: BlogPost,
  allTranslations: Partial<Record<SupportedLocale, BlogPost>>
): SeoMetadata {
  const data = entry.data;
  const currentLang = data.lang;
  const canonicalUrl = data.canonicalUrl || `${siteConfig.siteUrl}/${currentLang}/blog/${data.slug}`;

  // Build hreflangs only for genuinely existing translations of this translationId
  const hreflangs: Array<{ lang: SupportedLocale | 'x-default'; href: string }> = [];

  for (const locale of siteConfig.supportedLocales) {
    const translated = allTranslations[locale];
    if (translated && !translated.data.draft) {
      hreflangs.push({
        lang: locale,
        href: `${siteConfig.siteUrl}/${locale}/blog/${translated.data.slug}`,
      });
    }
  }

  // Set x-default to defaultLocale (zh-CN) if available, otherwise current entry
  const defaultVersion = allTranslations[siteConfig.defaultLocale] || entry;
  hreflangs.push({
    lang: 'x-default',
    href: `${siteConfig.siteUrl}/${defaultVersion.data.lang}/blog/${defaultVersion.data.slug}`,
  });

  const coverSrc = typeof data.cover === 'string' ? data.cover : data.cover.src;
  const ogImage = coverSrc.startsWith('http')
    ? coverSrc
    : `${siteConfig.siteUrl}${coverSrc.startsWith('/') ? '' : '/'}${coverSrc}`;

  return {
    title: `${data.title} — ${siteConfig.siteName[currentLang]}`,
    description: data.description,
    canonicalUrl,
    hreflangs,
    ogImage,
    ogType: 'article',
    publishedTime: data.pubDate,
    modifiedTime: data.updatedDate || data.pubDate,
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
      href: `${siteConfig.siteUrl}/${loc}${pagePath}`,
    })
  );

  hreflangs.push({
    lang: 'x-default',
    href: `${siteConfig.siteUrl}/${siteConfig.defaultLocale}${pagePath}`,
  });

  return {
    title: customTitle ? `${customTitle} — ${siteConfig.siteName[locale]}` : siteConfig.siteName[locale],
    description: customDescription || siteConfig.siteDescription[locale],
    canonicalUrl: `${siteConfig.siteUrl}/${locale}${pagePath}`,
    hreflangs,
    ogImage: siteConfig.author.avatar,
    ogType: 'website',
  };
}
