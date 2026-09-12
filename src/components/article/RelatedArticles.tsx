import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface RelatedArticleItem {
  slug: string;
  lang: string;
  title: string;
  description: string;
  category: string;
  cover: string;
  pubDate: string;
  readingTimeMinutes?: number;
}

export interface RelatedArticlesProps {
  articles: Array<RelatedArticleItem | { frontmatter: any; readingTimeMinutes?: number }>;
  heading: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, heading }) => {
  if (!articles || articles.length === 0) return null;

  const normalizedArticles: RelatedArticleItem[] = articles.map((item) => {
    if ('frontmatter' in item) {
      const fm = item.frontmatter;
      return {
        slug: fm.slug,
        lang: fm.lang,
        title: fm.title,
        description: fm.description,
        category: fm.category,
        cover: typeof fm.cover === 'string' ? fm.cover : fm.cover?.src || '',
        pubDate: fm.pubDate,
        readingTimeMinutes: item.readingTimeMinutes || 5,
      };
    }
    return item;
  });

  return (
    <section className="my-16 border-t border-[#1b1a18] pt-10">
      <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-[#e6e2d8]">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1b1a18]">
            03 / KEEP READING
          </span>
          <span className="text-[#cfc9be]">/</span>
          <h3 className="font-serif text-lg font-bold tracking-tight text-[#1b1a18]">
            {heading}
          </h3>
        </div>
      </div>

      <div className="divide-y divide-[#e6e2d8]">
        {normalizedArticles.map((item, idx) => (
          <a
            key={item.slug}
            href={`/${item.lang}/blog/${item.slug}`}
            className="group py-5 flex items-baseline justify-between gap-6 hover:bg-[#f3f0e8]/50 px-2 -mx-2 transition-colors block"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="text-[11px] font-mono text-[#88847b] uppercase tracking-wider">
                0{idx + 1}
              </div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1b1a18] group-hover:text-[#1e3a5f] transition-colors leading-snug">
                {item.title}
              </h4>
              <div className="text-xs font-mono text-[#88847b] flex items-center gap-2">
                <span className="uppercase">{item.category}</span>
                <span>·</span>
                <span>{item.pubDate}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#88847b] group-hover:text-[#1b1a18] group-hover:translate-x-1 transition-all shrink-0">
              <span>Read</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
