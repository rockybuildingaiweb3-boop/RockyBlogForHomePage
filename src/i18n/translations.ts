import type { SupportedLocale } from '../types/content';

export interface UiTranslations {
  // Navigation
  navHome: string;
  navBlog: string;
  navCategories: string;
  navTags: string;
  navArchive: string;
  navAbout: string;

  // Technical section headings
  featuredTitle: string;
  featuredSubtitle: string;
  latestArticlesTitle: string;
  latestArticlesSubtitle: string;
  categoriesTitle: string;
  allCategories: string;
  allTags: string;
  archiveTitle: string;
  archiveSubtitle: string;
  aboutTitle: string;

  // Article metadata
  publishedOn: string;
  updatedOn: string;
  readingTimeFormat: (min: number) => string;
  wordsCountFormat: (count: number) => string;
  authorLabel: string;
  categoryLabel: string;
  tagsLabel: string;
  shareLabel: string;
  tableOfContents: string;

  // Article bottom
  alsoPublishedOn: string;
  relatedArticles: string;
  previousArticle: string;
  nextArticle: string;
  backToBlog: string;

  // Language switcher
  languageSwitcherLabel: string;
  currentLanguage: string;
  availableIn: string;
  translationMissing: string;

  // Status & 404
  draftBadge: string;
  noArticlesFound: string;
  pageNotFoundTitle: string;
  pageNotFoundMessage: string;
  returnHome: string;
}

export const uiTranslations: Record<SupportedLocale, UiTranslations> = {
  'zh-CN': {
    navHome: '首页',
    navBlog: '文章',
    navCategories: '分类',
    navTags: '标签',
    navArchive: '归档',
    navAbout: '关于',

    featuredTitle: '精选技术解析',
    featuredSubtitle: '深度的系统架构剖析、AI Agent 实践与工程设计',
    latestArticlesTitle: '最新技术文章',
    latestArticlesSubtitle: '按时间沉淀的软件工程实践、技术笔记与架构演进',
    categoriesTitle: '技术领域分类',
    allCategories: '全部分类',
    allTags: '全部标签',
    archiveTitle: '文章归档',
    archiveSubtitle: '按时间线沉淀的全部技术文章与工程总结',
    aboutTitle: '关于技术博客',

    publishedOn: '发表于',
    updatedOn: '修订于',
    readingTimeFormat: (min) => `${min} 分钟阅读`,
    wordsCountFormat: (count) => `${count} 字`,
    authorLabel: '作者',
    categoryLabel: '分类',
    tagsLabel: '标签',
    shareLabel: '分享',
    tableOfContents: '目录索引',

    alsoPublishedOn: '同步发表于',
    relatedArticles: '相关技术文章',
    previousArticle: '上一篇',
    nextArticle: '下一篇',
    backToBlog: '返回技术文章列表',

    languageSwitcherLabel: '切换语言',
    currentLanguage: '当前语言',
    availableIn: '其他语言版本',
    translationMissing: '该版本尚未翻译',

    draftBadge: '草稿',
    noArticlesFound: '暂无收录技术文章',
    pageNotFoundTitle: '页面未找到',
    pageNotFoundMessage: '您访问的内容可能已被移动或不存在。',
    returnHome: '返回主页',
  },
  'en': {
    navHome: 'Home',
    navBlog: 'Articles',
    navCategories: 'Categories',
    navTags: 'Tags',
    navArchive: 'Archive',
    navAbout: 'About',

    featuredTitle: 'Featured Engineering',
    featuredSubtitle: 'In-depth architecture analysis, AI agent systems, and technical designs',
    latestArticlesTitle: 'Latest Articles',
    latestArticlesSubtitle: 'Chronological software engineering posts, technical notes, and retrospectives',
    categoriesTitle: 'Technical Categories',
    allCategories: 'All Categories',
    allTags: 'All Tags',
    archiveTitle: 'Articles Archive',
    archiveSubtitle: 'Complete timeline of engineering writings and technical notes',
    aboutTitle: 'About Blog',

    publishedOn: 'Published',
    updatedOn: 'Revised',
    readingTimeFormat: (min) => `${min} min read`,
    wordsCountFormat: (count) => `${count} words`,
    authorLabel: 'By',
    categoryLabel: 'Category',
    tagsLabel: 'Tags',
    shareLabel: 'Share',
    tableOfContents: 'Table of Contents',

    alsoPublishedOn: 'Cross-posted on',
    relatedArticles: 'Related Articles',
    previousArticle: 'Previous Article',
    nextArticle: 'Next Article',
    backToBlog: 'Back to Articles',

    languageSwitcherLabel: 'Language',
    currentLanguage: 'Current Language',
    availableIn: 'Available in',
    translationMissing: 'Not yet translated',

    draftBadge: 'Draft',
    noArticlesFound: 'No articles catalogued yet',
    pageNotFoundTitle: 'Page Not Found',
    pageNotFoundMessage: 'The piece you requested has either moved or does not exist.',
    returnHome: 'Return to Home',
  },
  'fr': {
    navHome: 'Accueil',
    navBlog: 'Articles',
    navCategories: 'Catégories',
    navTags: 'Tags',
    navArchive: 'Archives',
    navAbout: 'À propos',

    featuredTitle: 'Articles Techniques Sélectionnés',
    featuredSubtitle: 'Analyses d’architecture approfondies, systèmes d’agents IA et ingénierie',
    latestArticlesTitle: 'Derniers Articles',
    latestArticlesSubtitle: 'Pratiques de génie logiciel, notes techniques et bilans',
    categoriesTitle: 'Catégories Techniques',
    allCategories: 'Toutes les catégories',
    allTags: 'Tous les tags',
    archiveTitle: 'Archives des Articles',
    archiveSubtitle: 'Chronologie complète des publications techniques et retours d’expérience',
    aboutTitle: 'À Propos du Blog',

    publishedOn: 'Publié le',
    updatedOn: 'Révisé le',
    readingTimeFormat: (min) => `${min} min de lecture`,
    wordsCountFormat: (count) => `${count} mots`,
    authorLabel: 'Par',
    categoryLabel: 'Catégorie',
    tagsLabel: 'Tags',
    shareLabel: 'Partager',
    tableOfContents: 'Sommaire',

    alsoPublishedOn: 'Également publié sur',
    relatedArticles: 'Articles Connexes',
    previousArticle: 'Article Précédent',
    nextArticle: 'Article Suivant',
    backToBlog: 'Retour aux articles',

    languageSwitcherLabel: 'Langue',
    currentLanguage: 'Langue courante',
    availableIn: 'Disponible en',
    translationMissing: 'Non traduit dans cette langue',

    draftBadge: 'Brouillon',
    noArticlesFound: 'Aucun article répertorié',
    pageNotFoundTitle: 'Page Introuvable',
    pageNotFoundMessage: 'Le document recherché semble avoir été déplacé ou n’existe pas.',
    returnHome: 'Retour à l’accueil',
  },
  'de': {
    navHome: 'Startseite',
    navBlog: 'Artikel',
    navCategories: 'Kategorien',
    navTags: 'Tags',
    navArchive: 'Archiv',
    navAbout: 'Über mich',

    featuredTitle: 'Ausgewählte Fachartikel',
    featuredSubtitle: 'Tiefgehende Architekturanalysen, KI-Agentensysteme und Software-Engineering',
    latestArticlesTitle: 'Neueste Fachartikel',
    latestArticlesSubtitle: 'Chronologische Software-Engineering-Beiträge und technische Notizen',
    categoriesTitle: 'Technische Kategorien',
    allCategories: 'Alle Kategorien',
    allTags: 'Alle Tags',
    archiveTitle: 'Artikelarchiv',
    archiveSubtitle: 'Vollständige Zeitleiste aller technischen Artikel und Dokumentationen',
    aboutTitle: 'Über diesen Blog',

    publishedOn: 'Veröffentlicht am',
    updatedOn: 'Überarbeitet am',
    readingTimeFormat: (min) => `${min} Min. Lesezeit`,
    wordsCountFormat: (count) => `${count} Wörter`,
    authorLabel: 'Von',
    categoryLabel: 'Kategorie',
    tagsLabel: 'Tags',
    shareLabel: 'Teilen',
    tableOfContents: 'Inhaltsverzeichnis',

    alsoPublishedOn: 'Ebenfalls veröffentlicht auf',
    relatedArticles: 'Verwandte Artikel',
    previousArticle: 'Vorheriger Artikel',
    nextArticle: 'Nächster Artikel',
    backToBlog: 'Zurück zur Übersicht',

    languageSwitcherLabel: 'Sprache',
    currentLanguage: 'Aktuelle Sprache',
    availableIn: 'Verfügbar in',
    translationMissing: 'Noch nicht übersetzt',

    draftBadge: 'Entwurf',
    noArticlesFound: 'Bisher keine Beiträge erfasst',
    pageNotFoundTitle: 'Seite Nicht Gefunden',
    pageNotFoundMessage: 'Der aufgerufene Text existiert nicht oder wurde verschoben.',
    returnHome: 'Zurück zur Startseite',
  },
  'ja': {
    navHome: 'ホーム',
    navBlog: '記事一覧',
    navCategories: 'カテゴリー',
    navTags: 'タグ',
    navArchive: 'アーカイブ',
    navAbout: 'このブログについて',

    featuredTitle: '注目の技術記事',
    featuredSubtitle: 'システム設計、AIエージェント実践、ソフトウェア工学の深層解説',
    latestArticlesTitle: '最新の技術記事',
    latestArticlesSubtitle: '時系列で蓄積されたソフトウェア工学の実践、技術ノート、知見の記録',
    categoriesTitle: '技術カテゴリー',
    allCategories: 'すべてのカテゴリー',
    allTags: 'すべてのタグ',
    archiveTitle: '記事アーカイブ',
    archiveSubtitle: '過去に執筆されたすべての技術記事と開発記録の年表',
    aboutTitle: 'この技術ブログについて',

    publishedOn: '掲載日',
    updatedOn: '改訂日',
    readingTimeFormat: (min) => `${min} 分で読めます`,
    wordsCountFormat: (count) => `${count} 字`,
    authorLabel: '執筆',
    categoryLabel: 'カテゴリー',
    tagsLabel: 'タグ',
    shareLabel: '共有',
    tableOfContents: '目次索引',

    alsoPublishedOn: '他プラットフォームでの掲載',
    relatedArticles: '関連する技術記事',
    previousArticle: '前の記事',
    nextArticle: '次の記事',
    backToBlog: '記事一覧へ戻る',

    languageSwitcherLabel: '言語選択',
    currentLanguage: '現在の言語',
    availableIn: '他言語版',
    translationMissing: 'この言語の翻訳はありません',

    draftBadge: '草稿',
    noArticlesFound: '技術記事が見つかりませんでした',
    pageNotFoundTitle: 'ページが見つかりません',
    pageNotFoundMessage: 'お探しの文章は移動されたか、存在しない可能性があります。',
    returnHome: 'ホームへ戻る',
  },
};

export const localeDisplayNames: Record<SupportedLocale, string> = {
  'zh-CN': '中文',
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
};
