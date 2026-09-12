import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface AdjacentArticle {
  slug: string;
  lang: string;
  title: string;
}

export interface PreviousNextProps {
  previous?: AdjacentArticle | { frontmatter: AdjacentArticle };
  next?: AdjacentArticle | { frontmatter: AdjacentArticle };
  prevLabel: string;
  nextLabel: string;
}

export const PreviousNext: React.FC<PreviousNextProps> = ({
  previous: rawPrev,
  next: rawNext,
  prevLabel,
  nextLabel,
}) => {
  const previous = rawPrev ? ('frontmatter' in rawPrev ? rawPrev.frontmatter : rawPrev) : undefined;
  const next = rawNext ? ('frontmatter' in rawNext ? rawNext.frontmatter : rawNext) : undefined;

  if (!previous && !next) return null;

  return (
    <nav className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#e5e5e0] pt-8">
      {previous ? (
        <a
          href={`/${previous.lang}/blog/${previous.slug}`}
          className="group flex flex-col items-start text-left p-4 rounded-sm border border-[#e5e5e0] bg-[#faf9f6] hover:border-[#1a1a1a] transition-all"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[#737373] group-hover:text-[#1a1a1a] transition-colors mb-2">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {prevLabel}
          </span>
          <span className="font-serif text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
            {previous.title}
          </span>
        </a>
      ) : (
        <div />
      )}

      {next && (
        <a
          href={`/${next.lang}/blog/${next.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-sm border border-[#e5e5e0] bg-[#faf9f6] hover:border-[#1a1a1a] transition-all sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[#737373] group-hover:text-[#1a1a1a] transition-colors mb-2">
            {nextLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="font-serif text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
            {next.title}
          </span>
        </a>
      )}
    </nav>
  );
};
