import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { TocItem } from '../../types/content';

export interface TocProps {
  items: TocItem[];
  titleLabel: string;
}

export const TableOfContents: React.FC<TocProps> = ({ items, titleLabel }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="rounded-sm border border-[#e5e5e0] bg-[#faf9f6] p-5 text-sm">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#e5e5e0] text-xs font-semibold tracking-wider uppercase text-[#1a1a1a]">
        <List className="h-3.5 w-3.5" />
        <span>{titleLabel}</span>
      </div>
      <ul className="space-y-2 font-sans text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.depth === 3 ? 'pl-4' : item.depth === 4 ? 'pl-7' : 'pl-0';

          return (
            <li key={item.id} className={indent}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left transition-colors leading-relaxed ${
                  isActive
                    ? 'font-medium text-[#1a1a1a] underline underline-offset-4 decoration-1 decoration-[#1a1a1a]'
                    : 'text-[#737373] hover:text-[#262626]'
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
