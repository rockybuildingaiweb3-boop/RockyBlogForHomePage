import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const HomeView: React.FC = () => {
  const { locale, navigate } = useRouter();
  const t = uiTranslations[locale];

  const featuredArticles = contentRepo.getFeaturedArticles(locale, 3);
  const latestArticles = contentRepo.getLatestArticles(locale, 6);

  return (
    <div className="space-y-24 py-8 sm:py-12">
      {/* 1. Publication Hero Masthead */}
      <section className="border-b border-[#e5e5e0] pb-16">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373]">
            <Sparkles className="h-3.5 w-3.5 text-[#d97706]" />
            <span>Independent Digital Periodical</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] leading-[1.08]">
            {siteConfig.siteName[locale]}
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#525252] leading-relaxed max-w-2xl">
            {siteConfig.siteDescription[locale]}
          </p>
        </div>
      </section>

      {/* 2. Featured Section (Editorial Magazine Layout) */}
      {featuredArticles.length > 0 && (
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#e5e5e0] pb-4 gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1a1a]">
                {t.featuredTitle}
              </h2>
              <p className="text-xs text-[#737373] mt-1 font-sans">{t.featuredSubtitle}</p>
            </div>
            <button
              onClick={() => navigate(`/${locale.toLowerCase()}/blog`)}
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#525252] hover:text-[#1a1a1a] transition-colors"
            >
              <span>{t.navBlog}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Lead Featured Article */}
          {featuredArticles[0] && (
            <article
              onClick={() => navigate(`/${locale.toLowerCase()}/blog/${featuredArticles[0].frontmatter.slug}`)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 overflow-hidden rounded-sm bg-[#e8e6e1] aspect-[16/10]">
                <img
                  src={featuredArticles[0].frontmatter.cover}
                  alt={featuredArticles[0].frontmatter.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#737373]">
                  {featuredArticles[0].frontmatter.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1a1a] leading-tight group-hover:underline">
                  {featuredArticles[0].frontmatter.title}
                </h3>
                <p className="font-serif text-sm leading-relaxed text-[#525252] line-clamp-3">
                  {featuredArticles[0].frontmatter.description}
                </p>
                <div className="pt-2 text-xs font-mono text-[#737373]">
                  {featuredArticles[0].frontmatter.pubDate} • {t.readingTimeFormat(featuredArticles[0].readingTimeMinutes)}
                </div>
              </div>
            </article>
          )}

          {/* Sub-featured articles grid */}
          {featuredArticles.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {featuredArticles.slice(1).map((item) => (
                <article
                  key={item.frontmatter.slug}
                  onClick={() => navigate(`/${locale.toLowerCase()}/blog/${item.frontmatter.slug}`)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-sm bg-[#e8e6e1]">
                    <img
                      src={item.frontmatter.cover}
                      alt={item.frontmatter.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#737373]">
                    {item.frontmatter.category}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#1a1a1a] leading-snug group-hover:underline">
                    {item.frontmatter.title}
                  </h4>
                  <p className="font-serif text-sm text-[#525252] line-clamp-2">
                    {item.frontmatter.description}
                  </p>
                  <div className="text-xs font-mono text-[#737373]">
                    {item.frontmatter.pubDate} • {t.readingTimeFormat(item.readingTimeMinutes)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 3. Latest Dispatches Section */}
      <section className="space-y-10">
        <div className="border-b border-[#e5e5e0] pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1a1a]">
            {t.latestArticlesTitle}
          </h2>
          <p className="text-xs text-[#737373] mt-1 font-sans">{t.latestArticlesSubtitle}</p>
        </div>

        <div className="divide-y divide-[#ecebe6]">
          {latestArticles.map((article) => (
            <article
              key={article.frontmatter.slug}
              onClick={() => navigate(`/${locale.toLowerCase()}/blog/${article.frontmatter.slug}`)}
              className="group cursor-pointer py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-[#faf8f2] px-4 -mx-4 rounded-sm transition-colors"
            >
              <div className="md:col-span-3 text-xs font-mono text-[#737373] pt-1">
                <div>{article.frontmatter.pubDate}</div>
                <div className="text-[#a3a3a3] mt-1">{t.readingTimeFormat(article.readingTimeMinutes)}</div>
              </div>

              <div className="md:col-span-9 space-y-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#737373]">
                  {article.frontmatter.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1a1a1a] group-hover:underline leading-snug">
                  {article.frontmatter.title}
                </h3>
                <p className="font-serif text-sm text-[#525252] leading-relaxed">
                  {article.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {article.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-[#737373] bg-[#f0eee6] px-2 py-0.5 rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Subject Indexes / Categories */}
      <section className="rounded-sm border border-[#e5e5e0] bg-[#f5f4ef] p-8 sm:p-12 space-y-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a]">
            {t.categoriesTitle}
          </h2>
          <p className="text-xs text-[#737373] mt-1 font-sans">
            按核心学科与观察主题索引的所有出版物
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.categories.map((cat) => {
            const count = contentRepo.getArticlesByCategory(locale, cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/${locale.toLowerCase()}/category/${cat.id}`)}
                className="group p-5 bg-[#faf9f6] border border-[#e5e5e0] rounded-sm text-left hover:border-[#1a1a1a] transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-[#1a1a1a] group-hover:underline">
                    {cat.name[locale]}
                  </span>
                  <span className="text-xs font-mono text-[#737373]">{count}</span>
                </div>
                <p className="text-xs text-[#525252] line-clamp-2 leading-relaxed">
                  {cat.description?.[locale]}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Editorial Philosophy Colophon */}
      <section className="text-center py-12 border-t border-[#e5e5e0] space-y-4">
        <BookOpen className="h-6 w-6 text-[#737373] mx-auto" />
        <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">
          {siteConfig.author.name}
        </h3>
        <p className="font-serif text-sm max-w-xl mx-auto text-[#525252] leading-relaxed italic">
          "{siteConfig.author.bio[locale]}"
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate(`/${locale.toLowerCase()}/about`)}
            className="text-xs uppercase tracking-widest font-semibold text-[#1a1a1a] hover:underline"
          >
            {t.navAbout} →
          </button>
        </div>
      </section>
    </div>
  );
};
