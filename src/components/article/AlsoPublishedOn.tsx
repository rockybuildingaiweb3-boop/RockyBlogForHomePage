import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ExternalLink {
  platform: string;
  url: string;
  type: 'announcement' | 'full-post' | 'adapted';
}

export interface AlsoPublishedOnProps {
  links: ExternalLink[];
  label: string;
}

export const AlsoPublishedOn: React.FC<AlsoPublishedOnProps> = ({ links, label }) => {
  if (!links || links.length === 0) return null;

  const typeLabels: Record<string, string> = {
    'announcement': 'Digest / Link',
    'full-post': 'Full Post',
    'adapted': 'Adapted',
  };

  return (
    <div className="my-12 border-y border-[#e6e2d8] py-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#88847b] mb-2.5">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1b1a18] hover:text-[#1e3a5f] hover:underline underline-offset-4 transition-all"
          >
            <span className="font-semibold">{link.platform}</span>
            <span className="text-[10px] text-[#88847b]">[{typeLabels[link.type] || link.type}]</span>
            <ArrowUpRight className="h-3 w-3 text-[#88847b]" />
          </a>
        ))}
      </div>
    </div>
  );
};
