import React from 'react';
import type { ArticleRecord } from '../../types/content';

export interface RelatedArticlesProps {
  articles: ArticleRecord[];
  heading: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, heading }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-16 border-t border-[#e5e5e0] pt-12">
      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1a1a1a] mb-8">
        {heading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item) => (
          <a
            key={item.frontmatter.slug}
            href={`/${item.frontmatter.lang}/blog/${item.frontmatter.slug}`}
            className="group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="aspect-[16/10] overflow-hidden rounded-sm bg-[#e8e6e1]">
                <img
                  src={item.frontmatter.cover}
                  alt={item.frontmatter.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-[11px] font-semibold tracking-wider uppercase text-[#737373]">
                {item.frontmatter.category}
              </div>
              <h4 className="font-serif text-base font-bold text-[#1a1a1a] group-hover:underline line-clamp-2 leading-snug">
                {item.frontmatter.title}
              </h4>
              <p className="text-xs text-[#525252] line-clamp-2 font-serif leading-relaxed">
                {item.frontmatter.description}
              </p>
            </div>
            <div className="mt-4 text-[11px] text-[#a3a3a3] font-mono">
              {item.frontmatter.pubDate} • {item.readingTimeMinutes} min
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
