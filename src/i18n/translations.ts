import type { SupportedLocale } from '../types/content';

export interface UiTranslations {
  // Navigation
  navHome: string;
  navBlog: string;
  navCategories: string;
  navTags: string;
  navArchive: string;
  navAbout: string;
  navRss: string;

  // Editorial section headings
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
    navBlog: '文稿',
    navCategories: '分类',
    navTags: '标签',
    navArchive: '归档',
    navAbout: '关于',
    navRss: 'RSS 订阅',

    featuredTitle: '编辑精选',
    featuredSubtitle: '精心编排的长篇观点与核心架构剖析',
    latestArticlesTitle: '近期发表',
    latestArticlesSubtitle: '按时间倒序沉淀的思考手记与专题记录',
    categoriesTitle: '内容分类',
    allCategories: '所有分类',
    allTags: '全部标签',
    archiveTitle: '文章年鉴',
    archiveSubtitle: '时间长河中的思想印记与连续记录',
    aboutTitle: '关于本刊',

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
    relatedArticles: '相关推荐',
    previousArticle: '上一篇',
    nextArticle: '下一篇',
    backToBlog: '返回文稿列表',

    languageSwitcherLabel: '切换语言',
    currentLanguage: '当前语言',
    availableIn: '其他语言版本',
    translationMissing: '该版本尚未翻译',

    draftBadge: '草稿',
    noArticlesFound: '暂无收录文章',
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
    navRss: 'RSS Feed',

    featuredTitle: 'Curated Essays',
    featuredSubtitle: 'Editorial focal pieces on architecture, craft, and ideas',
    latestArticlesTitle: 'Recent Dispatches',
    latestArticlesSubtitle: 'Chronological essays, field notes, and technical observations',
    categoriesTitle: 'Subject Indexes',
    allCategories: 'All Categories',
    allTags: 'All Tags',
    archiveTitle: 'Chronological Archive',
    archiveSubtitle: 'A complete timeline of published writings across the years',
    aboutTitle: 'About Publication',

    publishedOn: 'Published',
    updatedOn: 'Revised',
    readingTimeFormat: (min) => `${min} min read`,
    wordsCountFormat: (count) => `${count} words`,
    authorLabel: 'By',
    categoryLabel: 'Category',
    tagsLabel: 'Tags',
    shareLabel: 'Share',
    tableOfContents: 'Table of Contents',

    alsoPublishedOn: 'Also Published On',
    relatedArticles: 'Related Readings',
    previousArticle: 'Previous Piece',
    nextArticle: 'Next Piece',
    backToBlog: 'Back to Articles',

    languageSwitcherLabel: 'Language',
    currentLanguage: 'Current Language',
    availableIn: 'Available in',
    translationMissing: 'Not yet translated',

    draftBadge: 'Draft',
    noArticlesFound: 'No articles catalogued yet',
    pageNotFoundTitle: 'Page Not Found',
    pageNotFoundMessage: 'The piece you requested has either moved or does not exist.',
    returnHome: 'Return to Cover',
  },
  'fr': {
    navHome: 'Accueil',
    navBlog: 'Articles',
    navCategories: 'Catégories',
    navTags: 'Mots-clés',
    navArchive: 'Archives',
    navAbout: 'À propos',
    navRss: 'Flux RSS',

    featuredTitle: 'Sélection Éditoriale',
    featuredSubtitle: 'Essais de fond, réflexions architecturales et récits choisis',
    latestArticlesTitle: 'Publications Récentes',
    latestArticlesSubtitle: 'Chronologie des réflexions, notes de terrain et observations',
    categoriesTitle: 'Index Thématiques',
    allCategories: 'Toutes les catégories',
    allTags: 'Tous les mots-clés',
    archiveTitle: 'Archives Chronologiques',
    archiveSubtitle: 'Une perspective ordonnée des écrits au fil des années',
    aboutTitle: 'À propos de cette revue',

    publishedOn: 'Publié le',
    updatedOn: 'Révisé le',
    readingTimeFormat: (min) => `${min} min de lecture`,
    wordsCountFormat: (count) => `${count} mots`,
    authorLabel: 'Par',
    categoryLabel: 'Catégorie',
    tagsLabel: 'Mots-clés',
    shareLabel: 'Partager',
    tableOfContents: 'Sommaire',

    alsoPublishedOn: 'Également publié sur',
    relatedArticles: 'Lectures Liées',
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
    navBlog: 'Beiträge',
    navCategories: 'Kategorien',
    navTags: 'Schlagwörter',
    navArchive: 'Archiv',
    navAbout: 'Über mich',
    navRss: 'RSS-Feed',

    featuredTitle: 'Kuratorische Auswahl',
    featuredSubtitle: 'Vertiefende Essays über Systemgestaltung und visuelle Narrative',
    latestArticlesTitle: 'Aktuelle Veröffentlichungen',
    latestArticlesSubtitle: 'Chronologisch geordnete Gedanken, Skizzen und Analysen',
    categoriesTitle: 'Themenbereiche',
    allCategories: 'Alle Kategorien',
    allTags: 'Alle Schlagwörter',
    archiveTitle: 'Chronologisches Archiv',
    archiveSubtitle: 'Die vollständige Zeitleiste aller Gedanken und Publikationen',
    aboutTitle: 'Über diese Publikation',

    publishedOn: 'Veröffentlicht am',
    updatedOn: 'Überarbeitet am',
    readingTimeFormat: (min) => `${min} Min. Lesezeit`,
    wordsCountFormat: (count) => `${count} Wörter`,
    authorLabel: 'Von',
    categoryLabel: 'Kategorie',
    tagsLabel: 'Schlagwörter',
    shareLabel: 'Teilen',
    tableOfContents: 'Inhaltsverzeichnis',

    alsoPublishedOn: 'Ebenfalls veröffentlicht auf',
    relatedArticles: 'Verwandte Beiträge',
    previousArticle: 'Vorheriger Beitrag',
    nextArticle: 'Nächster Beitrag',
    backToBlog: 'Zurück zur Übersicht',

    languageSwitcherLabel: 'Sprache',
    currentLanguage: 'Aktuelle Sprache',
    availableIn: 'Verfügbar in',
    translationMissing: 'Noch nicht übersetzt',

    draftBadge: 'Entwurf',
    noArticlesFound: 'Bisher keine Beiträge erfasst',
    pageNotFoundTitle: 'Seite Nicht Gefunden',
    pageNotFoundMessage: 'Der aufgerufene Text existiert nicht oder wurde verschoben.',
    returnHome: 'Zurück zur Titelseite',
  },
  'ja': {
    navHome: '表紙',
    navBlog: '手記一覧',
    navCategories: '分類',
    navTags: '標識',
    navArchive: '年譜',
    navAbout: '刊行について',
    navRss: 'RSS 購読',

    featuredTitle: '特選論稿',
    featuredSubtitle: '綿密に紡がれた技術哲学と思索の長編エッセイ',
    latestArticlesTitle: '新着手記',
    latestArticlesSubtitle: '時系列で綴る観察記録と技術的試作の考察',
    categoriesTitle: '主題分類',
    allCategories: 'すべての分類',
    allTags: 'すべての標識',
    archiveTitle: '年代記アーカイブ',
    archiveSubtitle: '歳月の経過とともに蓄積された思考の軌跡',
    aboutTitle: '本誌について',

    publishedOn: '掲載日',
    updatedOn: '改訂日',
    readingTimeFormat: (min) => `${min} 分で読めます`,
    wordsCountFormat: (count) => `${count} 字`,
    authorLabel: '執筆',
    categoryLabel: '主題',
    tagsLabel: '標識',
    shareLabel: '共有',
    tableOfContents: '目次索引',

    alsoPublishedOn: '他媒体での同時掲載',
    relatedArticles: '関連する手記',
    previousArticle: '前の手記',
    nextArticle: '次の手記',
    backToBlog: '手記一覧へ戻る',

    languageSwitcherLabel: '言語選択',
    currentLanguage: '現在の言語',
    availableIn: '他言語版',
    translationMissing: 'この言語の翻訳はありません',

    draftBadge: '草稿',
    noArticlesFound: '記事が見つかりませんでした',
    pageNotFoundTitle: 'ページが見つかりません',
    pageNotFoundMessage: 'お探しの文章は移動されたか、存在しない可能性があります。',
    returnHome: '表紙へ戻る',
  },
};

export const localeDisplayNames: Record<SupportedLocale, string> = {
  'zh-CN': '中文',
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
};
