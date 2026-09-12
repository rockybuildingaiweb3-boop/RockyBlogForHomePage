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
    <nav className="my-16 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#e6e2d8] pt-10">
      {previous ? (
        <a
          href={`/${previous.lang}/blog/${previous.slug}`}
          className="group flex flex-col items-start text-left space-y-2 py-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#88847b] group-hover:text-[#1b1a18] transition-colors">
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            {prevLabel}
          </span>
          <span className="font-serif text-lg font-bold text-[#1b1a18] group-hover:text-[#1e3a5f] line-clamp-2 leading-snug transition-colors">
            {previous.title}
          </span>
        </a>
      ) : (
        <div />
      )}

      {next && (
        <a
          href={`/${next.lang}/blog/${next.slug}`}
          className="group flex flex-col items-end text-right space-y-2 py-2 sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#88847b] group-hover:text-[#1b1a18] transition-colors">
            {nextLabel}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="font-serif text-lg font-bold text-[#1b1a18] group-hover:text-[#1e3a5f] line-clamp-2 leading-snug transition-colors">
            {next.title}
          </span>
        </a>
      )}
    </nav>
  );
};
