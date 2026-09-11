import React from 'react';
import { Calendar } from 'lucide-react';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const ArchiveView: React.FC = () => {
  const { locale, navigate } = useRouter();
  const t = uiTranslations[locale];
  const archiveMap = contentRepo.getArchiveByYear(locale);
  const years = Array.from(archiveMap.keys()).sort((a, b) => b - a);

  return (
    <div className="py-8 sm:py-12 space-y-12">
      <header className="border-b border-[#e5e5e0] pb-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          {t.archiveTitle}
        </h1>
        <p className="font-serif text-lg text-[#525252] mt-3 max-w-2xl">
          {t.archiveSubtitle}
        </p>
      </header>

      {years.length === 0 ? (
        <div className="py-12 text-center text-[#737373] font-serif">
          {t.noArticlesFound}
        </div>
      ) : (
        <div className="space-y-16">
          {years.map((year) => {
            const articles = archiveMap.get(year) || [];
            return (
              <section key={year} className="space-y-6">
                <div className="flex items-center gap-4 border-b border-[#e5e5e0] pb-3">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                    {year}
                  </span>
                  <span className="text-xs font-mono text-[#737373]">
                    ({articles.length} pieces)
                  </span>
                </div>

                <div className="divide-y divide-[#ecebe6]">
                  {articles.map((article) => (
                    <article
                      key={article.frontmatter.slug}
                      onClick={() => navigate(`/${locale.toLowerCase()}/blog/${article.frontmatter.slug}`)}
                      className="group cursor-pointer py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#faf8f2] px-3 -mx-3 rounded-sm transition-colors"
                    >
                      <div className="space-y-1 max-w-3xl">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
                          <Calendar className="h-3 w-3" />
                          <span>{article.frontmatter.pubDate}</span>
                          <span className="text-[#d4d4d4]">•</span>
                          <span className="uppercase text-[10px] tracking-wider font-sans text-[#525252]">
                            {article.frontmatter.category}
                          </span>
                        </div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1a1a1a] group-hover:underline">
                          {article.frontmatter.title}
                        </h2>
                      </div>

                      <div className="text-xs font-mono text-[#a3a3a3] shrink-0">
                        {t.readingTimeFormat(article.readingTimeMinutes)}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
