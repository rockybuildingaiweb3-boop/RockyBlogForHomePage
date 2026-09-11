import React from 'react';

export interface NoteProps {
  type?: 'note' | 'quote' | 'marginalia' | 'dispatch';
  title?: string;
  children: React.ReactNode;
}

export const Note: React.FC<NoteProps> = ({
  type = 'note',
  title,
  children,
}) => {
  if (type === 'quote') {
    return (
      <blockquote className="my-12 border-l-2 border-[#1a1a1a] pl-6 sm:pl-8 italic font-serif text-xl sm:text-2xl leading-relaxed text-[#262626]">
        {children}
        {title && <cite className="mt-4 block not-italic font-sans text-xs tracking-widest uppercase text-[#737373]">— {title}</cite>}
      </blockquote>
    );
  }

  return (
    <aside className="my-8 rounded-sm border border-[#e5e5e0] bg-[#f5f4ef] p-6 text-[#404040]">
      {title && (
        <div className="mb-2 text-xs font-semibold tracking-widest uppercase text-[#1a1a1a]">
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed font-sans">{children}</div>
    </aside>
  );
};
