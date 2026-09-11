import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { siteConfig } from './config/site.config';
import { contentRepo } from './content';
import { uiTranslations } from './i18n/translations';
import { RouterProvider, useRouter } from './lib/router';
import { HomeView } from './views/HomeView';
import { BlogIndexView } from './views/BlogIndexView';
import { ArticleView } from './views/ArticleView';
import { CategoryView } from './views/CategoryView';
import { ArchiveView } from './views/ArchiveView';
import { TagsView } from './views/TagsView';
import { AboutView } from './views/AboutView';
import { RssView } from './views/RssView';

const MainContent: React.FC = () => {
  const { locale, routeType, slug, category, tag } = useRouter();
  const t = uiTranslations[locale];

  // Sync document head and html lang dynamically
  useEffect(() => {
    document.documentElement.lang = locale;

    let pageTitle = siteConfig.siteName[locale];
    let pageDesc = siteConfig.siteDescription[locale];

    if (routeType === 'article' && slug) {
      const article = contentRepo.getArticleBySlug(locale, slug);
      if (article) {
        pageTitle = `${article.frontmatter.title} — ${siteConfig.siteName[locale]}`;
        pageDesc = article.frontmatter.description;
      }
    } else if (routeType === 'blog-index') {
      pageTitle = `${t.navBlog} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'category' && category) {
      const cat = siteConfig.categories.find((c) => c.id.toLowerCase() === category.toLowerCase());
      pageTitle = `${cat ? cat.name[locale] : category} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'tag' && tag) {
      pageTitle = `#${tag} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'tags-index') {
      pageTitle = `${t.allTags} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'archive') {
      pageTitle = `${t.archiveTitle} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'about') {
      pageTitle = `${t.aboutTitle} — ${siteConfig.siteName[locale]}`;
    } else if (routeType === 'rss') {
      pageTitle = `RSS Feed (${locale}) — ${siteConfig.siteName[locale]}`;
    }

    document.title = pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', pageDesc);
  }, [locale, routeType, slug, category, tag, t]);

  const renderView = () => {
    switch (routeType) {
      case 'home':
        return <HomeView />;
      case 'blog-index':
        return <BlogIndexView />;
      case 'article':
        return <ArticleView />;
      case 'category':
        return <CategoryView />;
      case 'tags-index':
      case 'tag':
        return <TagsView />;
      case 'archive':
        return <ArchiveView />;
      case 'about':
        return <AboutView />;
      case 'rss':
        return <RssView />;
      case 'not-found':
      default:
        return (
          <div className="py-24 text-center space-y-6">
            <h1 className="font-serif text-4xl font-bold text-[#1a1a1a]">
              {t.pageNotFoundTitle}
            </h1>
            <p className="font-serif text-[#737373] text-base max-w-md mx-auto">
              {t.pageNotFoundMessage}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#1a1a1a]">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <MainContent />
    </RouterProvider>
  );
}
