import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Figure } from '../mdx/Figure';
import { Note } from '../mdx/Note';

export interface ArticleBodyProps {
  content: string;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => {
  // Pre-process content to handle custom MDX tags like <Figure ... /> and <Note ...> ... </Note>
  // We can render chunks sequentially
  const renderSections = () => {
    // Split by MDX component blocks
    const tokenRegex = /(<Figure[\s\S]*?\/>|<Note[\s\S]*?<\/Note>)/g;
    const parts = content.split(tokenRegex);

    return parts.map((part, index) => {
      const trimmed = part.trim();

      // Check Figure
      if (trimmed.startsWith('<Figure')) {
        const srcMatch = trimmed.match(/src=["'](.*?)["']/);
        const altMatch = trimmed.match(/alt=["'](.*?)["']/);
        const captionMatch = trimmed.match(/caption=["'](.*?)["']/);
        const layoutMatch = trimmed.match(/layout=["'](.*?)["']/);
        const creditMatch = trimmed.match(/credit=["'](.*?)["']/);

        return (
          <Figure
            key={index}
            src={srcMatch ? srcMatch[1] : ''}
            alt={altMatch ? altMatch[1] : ''}
            caption={captionMatch ? captionMatch[1] : undefined}
            layout={(layoutMatch ? layoutMatch[1] : 'standard') as any}
            credit={creditMatch ? creditMatch[1] : undefined}
          />
        );
      }

      // Check Note
      if (trimmed.startsWith('<Note')) {
        const typeMatch = trimmed.match(/type=["'](.*?)["']/);
        const titleMatch = trimmed.match(/title=["'](.*?)["']/);
        const bodyMatch = trimmed.match(/<Note[\s\S]*?>([\s\S]*?)<\/Note>/);

        return (
          <Note
            key={index}
            type={(typeMatch ? typeMatch[1] : 'note') as any}
            title={titleMatch ? titleMatch[1] : undefined}
          >
            {bodyMatch ? bodyMatch[1].trim() : ''}
          </Note>
        );
      }

      // Standard Markdown chunk
      if (!trimmed) return null;

      return (
        <div key={index} className="editorial-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1a] mt-12 mb-6">
                  {children}
                </h1>
              ),
              h2: ({ children }) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s\u4e00-\u9fa5\u3040-\u30ff-]/g, '')
                  .replace(/\s+/g, '-');
                return (
                  <h2 id={id} className="group font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1a1a1a] mt-14 mb-5 pt-4 scroll-mt-24 border-t border-[#ecebe6]">
                    <a href={`#${id}`} className="hover:underline">
                      {children}
                    </a>
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text = String(children);
                const id = text
                  .toLowerCase()
                  .replace(/[^\w\s\u4e00-\u9fa5\u3040-\u30ff-]/g, '')
                  .replace(/\s+/g, '-');
                return (
                  <h3 id={id} className="font-serif text-xl sm:text-2xl font-bold text-[#262626] mt-10 mb-4 scroll-mt-24">
                    <a href={`#${id}`} className="hover:underline">
                      {children}
                    </a>
                  </h3>
                );
              },
              p: ({ children }) => (
                <p className="font-serif text-lg leading-[1.8] text-[#262626] my-6 font-normal">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="my-6 list-disc space-y-2 pl-6 font-serif text-base leading-relaxed text-[#404040]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-6 list-decimal space-y-2 pl-6 font-serif text-base leading-relaxed text-[#404040]">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-8 border-l-2 border-[#1a1a1a] pl-6 font-serif text-xl italic text-[#404040]">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="rounded-sm bg-[#ecebe4] px-1.5 py-0.5 font-mono text-sm text-[#1a1a1a]" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="my-8 overflow-x-auto rounded-sm border border-[#e5e5e0] bg-[#1a1a1a] p-5 font-mono text-sm text-[#f5f5f5] leading-relaxed">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                );
              },
              table: ({ children }) => (
                <div className="my-8 overflow-x-auto border border-[#e5e5e0]">
                  <table className="w-full text-left text-sm font-sans border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border-b border-[#e5e5e0] bg-[#f5f4ef] px-4 py-3 font-semibold text-[#1a1a1a]">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-[#f0eee6] px-4 py-3 text-[#404040]">
                  {children}
                </td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="underline underline-offset-4 decoration-[#737373] hover:decoration-[#1a1a1a] text-[#1a1a1a] transition-all"
                >
                  {children}
                </a>
              ),
            }}
          >
            {part}
          </ReactMarkdown>
        </div>
      );
    });
  };

  return <div className="article-content-flow max-w-3xl mx-auto">{renderSections()}</div>;
};
