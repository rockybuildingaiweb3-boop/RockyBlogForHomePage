import React from 'react';
import { ArrowLeft, Calendar, Clock, Globe } from 'lucide-react';
import { AlsoPublishedOn } from '../components/article/AlsoPublishedOn';
import { ArticleBody } from '../components/article/ArticleBody';
import { PreviousNext } from '../components/article/PreviousNext';
import { RelatedArticles } from '../components/article/RelatedArticles';
import { TableOfContents } from '../components/article/TableOfContents';
import { siteConfig } from '../config/site.config';
import { contentRepo } from '../content';
import { localeDisplayNames, uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';
import { SupportedLocale } from '../types/content';

export const ArticleView: React.FC = () => {
  const { locale, slug, navigate, switchLanguage } = useRouter();
  const t = uiTranslations[locale];

  if (!slug) return null;

  const article = contentRepo.getArticleBySlug(locale, slug);

  if (!article) {
    return (
      <div className="py-24 text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold text-[#1a1a1a]">
          {t.pageNotFoundTitle}
        </h1>
        <p className="text-[#737373] text-sm max-w-md mx-auto">
          {t.pageNotFoundMessage}
        </p>
        <button
          onClick={() => navigate(`/${locale.toLowerCase()}/blog`)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#1a1a1a] text-xs uppercase font-medium text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#faf9f6] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.backToBlog}</span>
        </button>
      </div>
    );
  }

  const logical = contentRepo.getLogicalArticle(article.frontmatter.translationId);
  const relatedArticles = contentRepo.getRelatedArticles(article, 3);
  const { previous, next } = contentRepo.getAdjacentArticles(article);

  return (
    <article className="py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/${locale.toLowerCase()}/blog`)}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#737373] hover:text-[#1a1a1a] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.backToBlog}</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl space-y-6 mb-12">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => navigate(`/${locale.toLowerCase()}/category/${article.frontmatter.category}`)}
            className="font-semibold tracking-widest uppercase text-[#737373] hover:text-[#1a1a1a] transition-colors"
          >
            {article.frontmatter.category}
          </button>
          <span className="text-[#d4d4d4]">•</span>
          <span className="flex items-center gap-1 text-[#737373] font-mono">
            <Calendar className="h-3 w-3" />
            {article.frontmatter.pubDate}
          </span>
          {article.frontmatter.updatedDate && (
            <>
              <span className="text-[#d4d4d4]">•</span>
              <span className="text-[11px] text-[#a3a3a3] font-mono">
                {t.updatedOn}: {article.frontmatter.updatedDate}
              </span>
            </>
          )}
          <span className="text-[#d4d4d4]">•</span>
          <span className="flex items-center gap-1 text-[#737373] font-mono">
            <Clock className="h-3 w-3" />
            {t.readingTimeFormat(article.readingTimeMinutes)}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-[1.12]">
          {article.frontmatter.title}
        </h1>

        <p className="font-serif text-lg sm:text-xl text-[#525252] leading-relaxed">
          {article.frontmatter.description}
        </p>

        {/* Cross-Language Translation Bar */}
        <div className="pt-4 border-t border-[#e5e5e0] flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-[#737373] font-medium">
            <Globe className="h-3.5 w-3.5" />
            <span>{t.availableIn}:</span>
          </span>
          {siteConfig.supportedLocales.map((loc) => {
            const translation = logical?.translations[loc];
            const hasTranslation = !!translation;
            const isCurrent = loc === locale;

            if (isCurrent) {
              return (
                <span
                  key={loc}
                  className="px-2.5 py-1 bg-[#1a1a1a] text-[#faf9f6] font-medium rounded-sm"
                >
                  {localeDisplayNames[loc]}
                </span>
              );
            }

            if (hasTranslation) {
              return (
                <button
                  key={loc}
                  onClick={() => switchLanguage(loc)}
                  className="px-2.5 py-1 border border-[#e5e5e0] text-[#525252] hover:border-[#1a1a1a] hover:text-[#1a1a1a] bg-[#faf9f6] font-medium rounded-sm transition-colors"
                >
                  {localeDisplayNames[loc]}
                </button>
              );
            }

            return (
              <span
                key={loc}
                title={t.translationMissing}
                className="px-2.5 py-1 text-[#a3a3a3] line-through decoration-[#d4d4d4] cursor-not-allowed text-[11px]"
              >
                {localeDisplayNames[loc]}
              </span>
            );
          })}
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="my-12 -mx-4 sm:-mx-8 lg:-mx-12 overflow-hidden rounded-sm bg-[#e8e6e1] aspect-[16/9] max-h-[680px]">
        <img
          src={article.frontmatter.cover}
          alt={article.frontmatter.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Main Content + TOC Sticky Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <main className="lg:col-span-8 min-w-0">
          <ArticleBody content={article.rawBody} />

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-[#e5e5e0] flex flex-wrap gap-2">
            <span className="text-xs uppercase tracking-widest text-[#737373] self-center mr-2">
              {t.tagsLabel}:
            </span>
            {article.frontmatter.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/${locale.toLowerCase()}/tag/${encodeURIComponent(tag)}`)}
                className="text-xs font-mono text-[#525252] bg-[#f5f4ef] hover:bg-[#e8e6e1] px-2.5 py-1 rounded-sm transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* External Syndication Links */}
          {article.frontmatter.links && article.frontmatter.links.length > 0 && (
            <AlsoPublishedOn links={article.frontmatter.links} label={t.alsoPublishedOn} />
          )}

          {/* Previous / Next Article Navigation */}
          <PreviousNext
            previous={previous}
            next={next}
            prevLabel={t.previousArticle}
            nextLabel={t.nextArticle}
          />
        </main>

        {/* Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
          <TableOfContents items={article.toc} titleLabel={t.tableOfContents} />

          <div className="rounded-sm border border-[#e5e5e0] bg-[#faf9f6] p-5 text-xs space-y-3">
            <div className="font-semibold uppercase tracking-wider text-[#1a1a1a]">
              {siteConfig.author.name}
            </div>
            <p className="text-[#525252] leading-relaxed font-serif">
              {siteConfig.author.bio[locale]}
            </p>
          </div>
        </aside>
      </div>

      {/* Related Readings */}
      <RelatedArticles articles={relatedArticles} heading={t.relatedArticles} />
    </article>
  );
};
