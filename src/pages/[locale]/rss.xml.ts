import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../../config/site.config';
import { generateRssFeed } from '../../lib/rss';
import type { SupportedLocale } from '../../types/content';

export function getStaticPaths() {
  return siteConfig.supportedLocales.map((locale) => ({
    params: { locale },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as SupportedLocale;
  const allPosts = await getCollection('blog');
  const xml = generateRssFeed(locale, allPosts);

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
