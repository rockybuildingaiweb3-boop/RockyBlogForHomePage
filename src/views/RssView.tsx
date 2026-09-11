import React, { useState } from 'react';
import { Check, Copy, Rss } from 'lucide-react';
import { contentRepo } from '../content';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';
import { generateRssFeed } from '../lib/rss';

export const RssView: React.FC = () => {
  const { locale } = useRouter();
  const t = uiTranslations[locale];
  const [copied, setCopied] = useState(false);

  const articles = contentRepo.getAllArticles(false);
  const rssXml = generateRssFeed(locale, articles);

  const handleCopy = () => {
    navigator.clipboard.writeText(rssXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12 space-y-8 max-w-4xl mx-auto">
      <header className="border-b border-[#e5e5e0] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#d97706] uppercase tracking-wider">
          <Rss className="h-4 w-4" />
          <span>RSS 2.0 Syndicate Feed</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          {t.navRss} ({locale})
        </h1>
        <p className="font-serif text-base text-[#525252]">
          支持任意现代 RSS 阅读器（NetNewsWire, Reeder, Feedly 等）订阅本语言版本的内容推流。
        </p>
      </header>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#737373]">
          Payload preview: {articles.filter((a) => a.frontmatter.lang === locale).length} published items
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#1a1a1a] rounded-sm bg-[#1a1a1a] text-[#faf9f6] hover:bg-[#404040] transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy RSS XML'}</span>
        </button>
      </div>

      <pre className="p-6 rounded-sm border border-[#e5e5e0] bg-[#f5f4ef] font-mono text-xs text-[#262626] overflow-x-auto max-h-[600px] leading-relaxed">
        {rssXml}
      </pre>
    </div>
  );
};
