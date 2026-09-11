import React from 'react';
import { ExternalLink as LinkIcon } from 'lucide-react';
import { ExternalLink } from '../../types/content';

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
    <div className="my-10 rounded-sm border border-[#e5e5e0] bg-[#f9f8f3] p-5">
      <div className="text-[11px] font-semibold tracking-widest uppercase text-[#737373] mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-3">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#262626] bg-[#faf9f6] border border-[#e5e5e0] rounded-sm hover:border-[#1a1a1a] hover:bg-[#ffffff] transition-all"
          >
            <span>{link.platform}</span>
            <span className="text-[10px] text-[#737373]">({typeLabels[link.type] || link.type})</span>
            <LinkIcon className="h-3 w-3 text-[#737373]" />
          </a>
        ))}
      </div>
    </div>
  );
};
