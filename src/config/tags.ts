import type { SupportedLocale } from '../types/content';

export interface TagDefinition {
  id: string;
  name: Record<SupportedLocale, string>;
  description?: Record<SupportedLocale, string>;
}

export const tagsConfig: Record<string, TagDefinition> = {
  'architecture': {
    id: 'architecture',
    name: {
      'zh-CN': '架构设计',
      'en': 'Architecture',
      'fr': 'Architecture',
      'de': 'Architektur',
      'ja': 'アーキテクチャ',
    },
    description: {
      'zh-CN': '系统结构、技术演进与持久可维护性工程实践。',
      'en': 'System structure, technical evolution, and sustainable engineering craft.',
      'fr': 'Structure des systèmes, évolution technique et ingénierie durable.',
      'de': 'Systemstruktur, technische Entwicklung und nachhaltige Ingenieurpraxis.',
      'ja': 'システム構造、技術の進化、持続可能なエンジニアリングの実践。',
    },
  },
  'static-web': {
    id: 'static-web',
    name: {
      'zh-CN': '静态 Web',
      'en': 'Static Web',
      'fr': 'Web Statique',
      'de': 'Statisches Web',
      'ja': '静的Web',
    },
    description: {
      'zh-CN': '现代静态站点生成、边缘发布与无服务器技术。',
      'en': 'Modern static site generation, edge publishing, and serverless delivery.',
      'fr': 'Génération de sites statiques modernes et publication en périphérie.',
      'de': 'Moderne statische Site-Generierung und Edge-Bereitstellung.',
      'ja': '最新の静的サイト生成、エッジ配信、サーバーレス技術。',
    },
  },
  'typography': {
    id: 'typography',
    name: {
      'zh-CN': '文字排版',
      'en': 'Typography',
      'fr': 'Typographie',
      'de': 'Typografie',
      'ja': 'タイポグラフィ',
    },
    description: {
      'zh-CN': '字体层级、网格律动与数字出版排版美学。',
      'en': 'Font hierarchy, grid rhythm, and digital publication aesthetics.',
      'fr': 'Hiérarchie typographique, rythme de grille et esthétique d’édition.',
      'de': 'Schrifthierarchie, Rasterrhythmus und digitale Publikationsästhetik.',
      'ja': 'フォントの階層、グリッドのリズム、デジタル出版の組版美学。',
    },
  },
  'performance': {
    id: 'performance',
    name: {
      'zh-CN': '性能工程',
      'en': 'Performance',
      'fr': 'Performance',
      'de': 'Leistung',
      'ja': 'パフォーマンス',
    },
    description: {
      'zh-CN': '核心网页指标、加载时延优化与零冗余资产分发。',
      'en': 'Core Web Vitals, runtime latency tuning, and lean asset delivery.',
      'fr': 'Optimisation des signaux Web essentiels et distribution fluide.',
      'de': 'Core Web Vitals, Latenzoptimierung und schlanke Ressourcenbereitstellung.',
      'ja': 'コアウェブバイタル、実行時レイテンシのチューニング、無駄のない配信。',
    },
  },
  'markdown': {
    id: 'markdown',
    name: {
      'zh-CN': 'Markdown 工艺',
      'en': 'Markdown Craft',
      'fr': 'Art du Markdown',
      'de': 'Markdown-Handwerk',
      'ja': 'Markdownの技',
    },
    description: {
      'zh-CN': '纯文本编辑、自包含知识沉淀与 Markdown 工具链。',
      'en': 'Plain text authorship, self-contained knowledge, and tooling.',
      'fr': 'Écriture en texte brut et écosystème d’outils documentaires.',
      'de': 'Klartext-Autorenschaft und Markdown-Werkzeugketten.',
      'ja': 'プレーンテキスト執筆、自己完結型の知識、Markdownツールチェーン。',
    },
  },
  'minimalism': {
    id: 'minimalism',
    name: {
      'zh-CN': '极简主义',
      'en': 'Minimalism',
      'fr': 'Minimalisme',
      'de': 'Minimalismus',
      'ja': 'ミニマリズム',
    },
    description: {
      'zh-CN': '克制的信息架构、专注的阅读体验与系统去噪。',
      'en': 'Restrained information architecture, focused reading, and noise reduction.',
      'fr': 'Architecture de l’information épurée et concentration de lecture.',
      'de': 'Zurückhaltende Informationsarchitektur und fokussiertes Lesen.',
      'ja': '抑制された情報設計、集中した読書体験、ノイズの低減。',
    },
  },
};

/**
 * Get localized display name for a tag stable ID.
 * Falls back to capitalized ID if not explicitly predefined.
 */
export function getTagDisplayName(tagId: string, locale: SupportedLocale): string {
  const normalizedId = tagId.toLowerCase().trim();
  const tagDef = tagsConfig[normalizedId];
  if (tagDef && tagDef.name[locale]) {
    return tagDef.name[locale];
  }
  // Fallback: title-case the slug
  return tagId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get full tag definition if registered.
 */
export function getTagDefinition(tagId: string): TagDefinition | undefined {
  return tagsConfig[tagId.toLowerCase().trim()];
}

/**
 * Return all predefined tag definitions.
 */
export function getAllPredefinedTags(): TagDefinition[] {
  return Object.values(tagsConfig);
}
