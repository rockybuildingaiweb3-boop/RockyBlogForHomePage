import React from 'react';
import { Tag as TagIcon } from 'lucide-react';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const TagsView: React.FC = () => {
  const { locale, tag: currentTag, routeType, navigate } = useRouter();
  const t = uiTranslations[locale];

  const allArticles = contentRepo.getArticlesByLocale(locale, false);

  // Compute all unique tags with count
  const tagCounts = new Map<string, number>();
  for (const a of allArticles) {
    for (const tag of a.frontmatter.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  const sortedTags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  // If viewing a specific tag
  const filteredArticles = currentTag
    ? contentRepo.getArticlesByTag(locale, currentTag)
    : [];

  return (
    <div className="py-8 sm:py-12 space-y-12">
      <header className="border-b border-[#e5e5e0] pb-8 space-y-4">
        <div className="text-xs uppercase font-semibold tracking-widest text-[#737373]">
          {t.tagsLabel}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          {currentTag ? `#${currentTag}` : t.allTags}
        </h1>

        {/* Tag cloud pill list */}
        <div className="flex flex-wrap gap-2 pt-4">
          {sortedTags.map(([tag, count]) => {
            const isActive = tag.toLowerCase() === currentTag?.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => navigate(`/${locale.toLowerCase()}/tag/${encodeURIComponent(tag)}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                  isActive
                    ? 'bg-[#1a1a1a] text-[#faf9f6]'
                    : 'bg-[#f5f4ef] text-[#525252] hover:bg-[#e8e6e1]'
                }`}
              >
                <span>#{tag}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* If single tag, display articles */}
      {routeType === 'tag' && (
        <div>
          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-[#737373] font-serif">
              {t.noArticlesFound}
            </div>
          ) : (
            <div className="divide-y divide-[#ecebe6]">
              {filteredArticles.map((article) => (
                <article
                  key={article.frontmatter.slug}
                  onClick={() => navigate(`/${locale.toLowerCase()}/blog/${article.frontmatter.slug}`)}
                  className="group cursor-pointer py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 hover:bg-[#faf8f2] px-4 -mx-4 rounded-sm transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-[#737373]">
                      {article.frontmatter.pubDate} • {article.frontmatter.category}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#1a1a1a] group-hover:underline">
                      {article.frontmatter.title}
                    </h2>
                    <p className="font-serif text-sm text-[#525252] line-clamp-2">
                      {article.frontmatter.description}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[#a3a3a3] shrink-0">
                    {t.readingTimeFormat(article.readingTimeMinutes)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
