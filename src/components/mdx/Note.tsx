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
      <blockquote className="my-12 border-l-2 border-[#1b1a18] pl-6 sm:pl-8 italic font-serif text-xl sm:text-2xl leading-relaxed text-[#1b1a18]">
        {children}
        {title && <cite className="mt-4 block not-italic font-mono text-xs tracking-widest uppercase text-[#88847b]">— {title}</cite>}
      </blockquote>
    );
  }

  return (
    <aside className="my-8 border border-[#e6e2d8] bg-[#f5f3ec] p-6 text-[#1b1a18]">
      {title && (
        <div className="mb-2 text-xs font-mono font-bold tracking-widest uppercase text-[#1b1a18]">
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed font-serif text-[#57544e]">{children}</div>
    </aside>
  );
};
