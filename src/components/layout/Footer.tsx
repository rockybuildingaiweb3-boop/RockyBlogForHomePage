import React from 'react';
import { Rss } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { localeDisplayNames, uiTranslations } from '../../i18n/translations';
import { useRouter } from '../../lib/router';

export const Footer: React.FC = () => {
  const { locale, navigate, switchLanguage } = useRouter();
  const t = uiTranslations[locale];

  return (
    <footer className="border-t border-[#e5e5e0] bg-[#f5f4ef] text-[#525252] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Masthead & Bio */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1a1a1a]">
              {siteConfig.siteName[locale]}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[#525252] font-serif">
              {siteConfig.siteDescription[locale]}
            </p>
            <div className="pt-2 text-xs font-mono text-[#737373]">
              Static by Default • Zero Runtime DB • Open Editorial Standard
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a]">
              {t.categoriesTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate(`/${locale.toLowerCase()}/category/${cat.id}`)}
                    className="hover:text-[#1a1a1a] transition-colors"
                  >
                    {cat.name[locale]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Languages & Feeds */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[#1a1a1a]">
              {t.languageSwitcherLabel}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {siteConfig.supportedLocales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLanguage(loc)}
                  className={`px-2.5 py-1 border rounded-sm transition-colors ${
                    loc === locale
                      ? 'border-[#1a1a1a] bg-[#1a1a1a] text-[#faf9f6]'
                      : 'border-[#e5e5e0] bg-[#faf9f6] text-[#525252] hover:border-[#a3a3a3]'
                  }`}
                >
                  {localeDisplayNames[loc]}
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate(`/${locale.toLowerCase()}/rss.xml`)}
                className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#d97706] transition-colors"
              >
                <Rss className="h-3.5 w-3.5" />
                <span>{t.navRss} ({locale})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="mt-16 border-t border-[#e5e5e0] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            © 2026 {siteConfig.author.name}. All rights reserved. Content licensed under editorial terms.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(`/${locale.toLowerCase()}/archive`)}
              className="hover:text-[#1a1a1a] transition-colors"
            >
              {t.navArchive}
            </button>
            <button
              onClick={() => navigate(`/${locale.toLowerCase()}/about`)}
              className="hover:text-[#1a1a1a] transition-colors"
            >
              {t.navAbout}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
