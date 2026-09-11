import React from 'react';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const BlogIndexView: React.FC = () => {
  const { locale, navigate } = useRouter();
  const t = uiTranslations[locale];
  const articles = contentRepo.getArticlesByLocale(locale, false);

  return (
    <div className="py-8 sm:py-12 space-y-12">
      <header className="border-b border-[#e5e5e0] pb-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          {t.navBlog}
        </h1>
        <p className="font-serif text-lg text-[#525252] mt-3 max-w-2xl">
          {t.latestArticlesSubtitle}
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="py-12 text-center text-[#737373] font-serif">
          {t.noArticlesFound}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article
              key={article.frontmatter.slug}
              onClick={() => navigate(`/${locale.toLowerCase()}/blog/${article.frontmatter.slug}`)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-[#e8e6e1]">
                  <img
                    src={article.frontmatter.cover}
                    alt={article.frontmatter.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-[#737373]">
                  <span>{article.frontmatter.category}</span>
                  <span className="font-mono text-[#a3a3a3]">{article.frontmatter.pubDate}</span>
                </div>
                <h2 className="font-serif text-xl font-bold text-[#1a1a1a] group-hover:underline leading-snug">
                  {article.frontmatter.title}
                </h2>
                <p className="font-serif text-sm text-[#525252] line-clamp-3 leading-relaxed">
                  {article.frontmatter.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ecebe6] flex items-center justify-between text-xs font-mono text-[#737373]">
                <span>{t.readingTimeFormat(article.readingTimeMinutes)}</span>
                <span className="text-[#1a1a1a] group-hover:translate-x-1 transition-transform">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
