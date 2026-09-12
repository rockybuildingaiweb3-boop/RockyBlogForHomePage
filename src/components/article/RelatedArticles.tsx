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
      <div className="flex items-baseline justify-between mb-8">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1b1a18]">
            INDEX
          </span>
          <span className="text-[#cfc9be]">/</span>
          <h3 className="font-serif text-xl font-bold tracking-tight text-[#1b1a18]">
            {heading}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {normalizedArticles.map((item, idx) => (
          <a
            key={item.slug}
            href={`/${item.lang}/blog/${item.slug}`}
            className="group flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              <div className="aspect-[16/10] overflow-hidden border border-[#e6e2d8] bg-[#e8e4db]">
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between text-[10px] font-mono uppercase tracking-wider text-[#88847b]">
                <span>0{idx + 1} · {item.category}</span>
                <span>{item.pubDate}</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#1b1a18] group-hover:text-[#1e3a5f] group-hover:underline underline-offset-4 line-clamp-2 leading-snug transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-[#57544e] line-clamp-2 font-serif leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#88847b] group-hover:text-[#1b1a18] pt-1">
              <span>Read</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
