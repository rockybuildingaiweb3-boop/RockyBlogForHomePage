import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig } from '../config/site.config';
import { contentRepo } from '../content';
import { SupportedLocale } from '../types/content';

export type RouteType =
  | 'home'
  | 'blog-index'
  | 'article'
  | 'category'
  | 'tags-index'
  | 'tag'
  | 'archive'
  | 'about'
  | 'rss'
  | 'not-found';

export interface RouteState {
  locale: SupportedLocale;
  routeType: RouteType;
  slug?: string;
  category?: string;
  tag?: string;
  currentPath: string;
}

export interface RouterContextType extends RouteState {
  navigate: (path: string) => void;
  switchLanguage: (targetLocale: SupportedLocale) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function parsePath(pathname: string): RouteState {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const parts = normalized.split('/').filter(Boolean);

  if (parts.length === 0) {
    return {
      locale: siteConfig.defaultLocale,
      routeType: 'home',
      currentPath: `/${siteConfig.defaultLocale.toLowerCase()}`,
    };
  }

  // Check if first segment is a valid locale
  const candidateLocale = parts[0].toLowerCase();
  const matchedLocale = siteConfig.supportedLocales.find(
    (l) => l.toLowerCase() === candidateLocale
  );

  if (!matchedLocale) {
    // If no locale prefix, assume defaultLocale and treat parts as subroute
    return {
      locale: siteConfig.defaultLocale,
      routeType: 'home',
      currentPath: `/${siteConfig.defaultLocale.toLowerCase()}`,
    };
  }

  const subRoute = parts[1]?.toLowerCase() || '';

  if (!subRoute) {
    return {
      locale: matchedLocale,
      routeType: 'home',
      currentPath: `/${matchedLocale.toLowerCase()}`,
    };
  }

  if (subRoute === 'blog') {
    if (parts[2]) {
      return {
        locale: matchedLocale,
        routeType: 'article',
        slug: parts[2],
        currentPath: normalized,
      };
    }
    return {
      locale: matchedLocale,
      routeType: 'blog-index',
      currentPath: normalized,
    };
  }

  if (subRoute === 'category' && parts[2]) {
    return {
      locale: matchedLocale,
      routeType: 'category',
      category: parts[2],
      currentPath: normalized,
    };
  }

  if (subRoute === 'tags') {
    return {
      locale: matchedLocale,
      routeType: 'tags-index',
      currentPath: normalized,
    };
  }

  if (subRoute === 'tag' && parts[2]) {
    return {
      locale: matchedLocale,
      routeType: 'tag',
      tag: decodeURIComponent(parts[2]),
      currentPath: normalized,
    };
  }

  if (subRoute === 'archive') {
    return {
      locale: matchedLocale,
      routeType: 'archive',
      currentPath: normalized,
    };
  }

  if (subRoute === 'about') {
    return {
      locale: matchedLocale,
      routeType: 'about',
      currentPath: normalized,
    };
  }

  if (subRoute === 'rss.xml') {
    return {
      locale: matchedLocale,
      routeType: 'rss',
      currentPath: normalized,
    };
  }

  return {
    locale: matchedLocale,
    routeType: 'not-found',
    currentPath: normalized,
  };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routeState, setRouteState] = useState<RouteState>(() =>
    parsePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parsePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRouteState(parsePath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchLanguage = (targetLocale: SupportedLocale) => {
    if (targetLocale === routeState.locale) return;

    // Smart cross-language navigation preserving context
    if (routeState.routeType === 'article' && routeState.slug) {
      const currentArticle = contentRepo.getArticleBySlug(routeState.locale, routeState.slug);
      if (currentArticle) {
        const logical = contentRepo.getLogicalArticle(currentArticle.frontmatter.translationId);
        const translatedVersion = logical?.translations[targetLocale];
        if (translatedVersion) {
          navigate(`/${targetLocale.toLowerCase()}/blog/${translatedVersion.frontmatter.slug}`);
          return;
        }
      }
      // If no translation exists for this article, fallback to blog index of target language
      navigate(`/${targetLocale.toLowerCase()}/blog`);
      return;
    }

    if (routeState.routeType === 'category' && routeState.category) {
      navigate(`/${targetLocale.toLowerCase()}/category/${routeState.category}`);
      return;
    }

    if (routeState.routeType === 'tag' && routeState.tag) {
      navigate(`/${targetLocale.toLowerCase()}/tag/${routeState.tag}`);
      return;
    }

    if (routeState.routeType === 'tags-index') {
      navigate(`/${targetLocale.toLowerCase()}/tags`);
      return;
    }

    if (routeState.routeType === 'archive') {
      navigate(`/${targetLocale.toLowerCase()}/archive`);
      return;
    }

    if (routeState.routeType === 'about') {
      navigate(`/${targetLocale.toLowerCase()}/about`);
      return;
    }

    if (routeState.routeType === 'blog-index') {
      navigate(`/${targetLocale.toLowerCase()}/blog`);
      return;
    }

    // Default: target language home
    navigate(`/${targetLocale.toLowerCase()}`);
  };

  return (
    <RouterContext.Provider
      value={{
        ...routeState,
        navigate,
        switchLanguage,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
