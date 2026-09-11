import React from 'react';
import { siteConfig } from '../config/site.config';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const CategoryView: React.FC = () => {
  const { locale, category: categoryId, navigate } = useRouter();
  const t = uiTranslations[locale];

  const categoryDef = siteConfig.categories.find(
    (c) => c.id.toLowerCase() === categoryId?.toLowerCase()
  );

  const articles = categoryId
    ? contentRepo.getArticlesByCategory(locale, categoryId)
    : [];

  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Category Header */}
      <header className="border-b border-[#e5e5e0] pb-8 space-y-4">
        <div className="text-xs uppercase font-semibold tracking-widest text-[#737373]">
          {t.categoryLabel}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          {categoryDef ? categoryDef.name[locale] : categoryId}
        </h1>
        {categoryDef?.description?.[locale] && (
          <p className="font-serif text-lg text-[#525252] max-w-2xl leading-relaxed">
            {categoryDef.description[locale]}
          </p>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {siteConfig.categories.map((cat) => {
            const isActive = cat.id === categoryId;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/${locale.toLowerCase()}/category/${cat.id}`)}
                className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
                  isActive
                    ? 'bg-[#1a1a1a] text-[#faf9f6] font-medium'
                    : 'bg-[#f5f4ef] text-[#525252] hover:bg-[#e8e6e1]'
                }`}
              >
                {cat.name[locale]}
              </button>
            );
          })}
        </div>
      </header>

      {/* Articles List */}
      {articles.length === 0 ? (
        <div className="py-16 text-center text-[#737373] font-serif">
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
                <div className="text-xs font-mono text-[#a3a3a3]">
                  {article.frontmatter.pubDate}
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
