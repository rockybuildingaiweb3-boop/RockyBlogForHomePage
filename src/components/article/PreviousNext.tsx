import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ArticleRecord } from '../../types/content';
import { useRouter } from '../../lib/router';

export interface PreviousNextProps {
  previous?: ArticleRecord;
  next?: ArticleRecord;
  prevLabel: string;
  nextLabel: string;
}

export const PreviousNext: React.FC<PreviousNextProps> = ({
  previous,
  next,
  prevLabel,
  nextLabel,
}) => {
  const { navigate } = useRouter();

  if (!previous && !next) return null;

  return (
    <nav className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#e5e5e0] pt-8">
      {previous ? (
        <button
          onClick={() => navigate(`/${previous.frontmatter.lang.toLowerCase()}/blog/${previous.frontmatter.slug}`)}
          className="group flex flex-col items-start text-left p-4 rounded-sm border border-[#e5e5e0] bg-[#faf9f6] hover:border-[#1a1a1a] transition-all"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[#737373] group-hover:text-[#1a1a1a] transition-colors mb-2">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {prevLabel}
          </span>
          <span className="font-serif text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
            {previous.frontmatter.title}
          </span>
        </button>
      ) : (
        <div />
      )}

      {next && (
        <button
          onClick={() => navigate(`/${next.frontmatter.lang.toLowerCase()}/blog/${next.frontmatter.slug}`)}
          className="group flex flex-col items-end text-right p-4 rounded-sm border border-[#e5e5e0] bg-[#faf9f6] hover:border-[#1a1a1a] transition-all sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-[#737373] group-hover:text-[#1a1a1a] transition-colors mb-2">
            {nextLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="font-serif text-sm font-semibold text-[#1a1a1a] line-clamp-2 leading-snug">
            {next.frontmatter.title}
          </span>
        </button>
      )}
    </nav>
  );
};
