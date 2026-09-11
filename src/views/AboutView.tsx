import React from 'react';
import { Mail, Github, Compass, Feather } from 'lucide-react';
import { siteConfig } from '../config/site.config';
import { uiTranslations } from '../i18n/translations';
import { useRouter } from '../lib/router';

export const AboutView: React.FC = () => {
  const { locale } = useRouter();
  const t = uiTranslations[locale];

  return (
    <div className="py-8 sm:py-12 space-y-16 max-w-4xl mx-auto">
      <header className="border-b border-[#e5e5e0] pb-8 space-y-4">
        <div className="text-xs uppercase font-semibold tracking-widest text-[#737373]">
          Colophon & Manifesto
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1a1a1a]">
          {t.aboutTitle}
        </h1>
        <p className="font-serif text-xl text-[#525252] leading-relaxed">
          {siteConfig.siteDescription[locale]}
        </p>
      </header>

      {/* Author Card & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4 space-y-4">
          <div className="aspect-square overflow-hidden rounded-sm bg-[#e8e6e1]">
            <img
              src={siteConfig.author.avatar}
              alt={siteConfig.author.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="font-serif text-lg font-bold text-[#1a1a1a]">
              {siteConfig.author.name}
            </div>
            <div className="text-xs text-[#737373] font-mono">
              Independent Author & System Craft
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6 font-serif text-base sm:text-lg leading-relaxed text-[#262626]">
          <p>
            {siteConfig.author.bio[locale]}
          </p>
          <p>
            本出版物旨在重塑数字时代被算法与推流瓦解的长文本阅读体验。我们严格奉行<strong>“静态至上（Static-by-Default）”</strong>与<strong>“低维护（Low-Maintenance）”</strong>原则，不设立中心化数据库、不引入用户追踪、不设立广告插槽，所有内容均由纯文本 Markdown/MDX 与本地无损摄影资源构成。
          </p>

          <div className="my-8 rounded-sm border border-[#e5e5e0] bg-[#f5f4ef] p-6 space-y-3 font-sans text-sm text-[#404040]">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#1a1a1a]">
              <Feather className="h-4 w-4" />
              <span>出版物核心准则</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs leading-relaxed text-[#525252]">
              <li><strong>文字第一</strong>：拒绝信息噪声，确保标题、正文与留白具备数学与光学比例。</li>
              <li><strong>摄影叙事</strong>：所有配图均为纪实大画幅与建筑光影，参与内容叙事而非单纯装饰。</li>
              <li><strong>五语言原生并存</strong>：中文、英语、法语、德语、日语平等演进，通过稳定翻译标识联动。</li>
              <li><strong>永久可索引</strong>：生成纯静态标准 HTML/CSS，可在全球任何边缘网络长期留存。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Direct Contact & Social channels */}
      <section className="border-t border-[#e5e5e0] pt-10 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#1a1a1a]">
          通讯与社交频段
        </h2>
        <div className="flex flex-wrap gap-4 text-xs font-medium">
          {siteConfig.author.social.email && (
            <a
              href={siteConfig.author.social.email}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e0] rounded-sm bg-[#faf9f6] text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
          )}
          {siteConfig.author.social.github && (
            <a
              href={siteConfig.author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e0] rounded-sm bg-[#faf9f6] text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {siteConfig.author.social.x && (
            <a
              href={siteConfig.author.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#e5e5e0] rounded-sm bg-[#faf9f6] text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>X (Twitter)</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
};
