import type { APIRoute } from 'astro';
import { siteConfig } from '../../config/site.config';
import { contentRepo } from '../../content';
import { generateRssFeed } from '../../lib/rss';
import type { SupportedLocale } from '../../types/content';

export function getStaticPaths() {
  return siteConfig.supportedLocales.map((locale) => ({
    params: { locale },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as SupportedLocale;
  const articles = contentRepo.getArticlesByLocale(locale, false);
  const xml = generateRssFeed(locale, articles);

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
