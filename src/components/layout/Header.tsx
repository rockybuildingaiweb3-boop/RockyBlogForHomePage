import React, { useState } from 'react';
import { Globe, Menu, Rss, X } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { localeDisplayNames, uiTranslations } from '../../i18n/translations';
import { useRouter } from '../../lib/router';
import { SupportedLocale } from '../../types/content';

export const Header: React.FC = () => {
  const { locale, navigate, switchLanguage } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiTranslations[locale];

  const navLinks = [
    { label: t.navBlog, path: `/${locale.toLowerCase()}/blog` },
    { label: t.navCategories, path: `/${locale.toLowerCase()}/category/${siteConfig.categories[0].id}` },
    { label: t.navArchive, path: `/${locale.toLowerCase()}/archive` },
    { label: t.navAbout, path: `/${locale.toLowerCase()}/about` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e5e0] bg-[#faf9f6]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        {/* Masthead / Brand */}
        <div className="flex items-center gap-6">
          <button
            id="nav-logo"
            onClick={() => navigate(`/${locale.toLowerCase()}`)}
            className="text-left group"
          >
            <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1a1a1a] transition-colors group-hover:text-[#404040]">
              {siteConfig.siteName[locale]}
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-[#737373] font-sans">
              Editorial Publication
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#525252]">
          {navLinks.map((link) => (
            <button
              key={link.path}
              id={`nav-link-${link.label}`}
              onClick={() => navigate(link.path)}
              className="transition-colors hover:text-[#1a1a1a]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Multilingual Switcher & Utilities */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center rounded-sm border border-[#e5e5e0] bg-[#f5f4ef] p-0.5 text-xs">
            <div className="flex items-center px-2 py-1 text-[#737373]">
              <Globe className="h-3.5 w-3.5 mr-1" />
            </div>
            {siteConfig.supportedLocales.map((loc) => {
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  id={`lang-switch-${loc}`}
                  onClick={() => switchLanguage(loc)}
                  className={`px-2.5 py-1 font-medium transition-all rounded-sm ${
                    isActive
                      ? 'bg-[#1a1a1a] text-[#faf9f6] shadow-xs'
                      : 'text-[#525252] hover:text-[#1a1a1a] hover:bg-[#eae8e1]'
                  }`}
                  title={localeDisplayNames[loc]}
                >
                  {loc.toUpperCase()}
                </button>
              );
            })}
          </div>

          <button
            id="nav-rss-btn"
            onClick={() => navigate(`/${locale.toLowerCase()}/rss.xml`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#737373] border border-[#e5e5e0] rounded-sm hover:text-[#1a1a1a] hover:bg-[#f5f4ef] transition-colors"
            title={t.navRss}
          >
            <Rss className="h-3 w-3 text-[#d97706]" />
            <span className="font-mono">RSS</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1a1a1a] hover:bg-[#f0eee6] rounded-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e0] bg-[#faf9f6] px-6 py-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-base font-serif">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-[#262626] border-b border-[#f0eee6]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#e5e5e0]">
            <div className="text-xs uppercase tracking-widest text-[#737373] mb-3">
              {t.languageSwitcherLabel}
            </div>
            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              {siteConfig.supportedLocales.map((loc) => {
                const isActive = loc === locale;
                return (
                  <button
                    key={loc}
                    onClick={() => {
                      switchLanguage(loc);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 border rounded-sm font-medium ${
                      isActive
                        ? 'bg-[#1a1a1a] text-[#faf9f6] border-[#1a1a1a]'
                        : 'border-[#e5e5e0] text-[#525252] bg-[#f5f4ef]'
                    }`}
                  >
                    {localeDisplayNames[loc]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
