import type { CategoryDefinition, SupportedLocale } from '../types/content';

export const VALID_CATEGORIES = [
  'engineering',
  'ai',
  'frontend',
  'design-ux',
  'notes',
] as const;

export type ValidCategory = (typeof VALID_CATEGORIES)[number];

export interface SiteConfig {
  siteName: Record<SupportedLocale, string>;
  siteDescription: Record<SupportedLocale, string>;
  siteUrl: string;
  defaultLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
  author: {
    name: string;
    bio: Record<SupportedLocale, string>;
    avatar: string;
    social: {
      github?: string;
      x?: string;
      linkedin?: string;
      email?: string;
    };
  };
  categories: CategoryDefinition[];
}

// Canonical production site URL source of truth
const envSiteUrl = typeof process !== 'undefined' ? (process.env.PUBLIC_SITE_URL || process.env.SITE_URL) : undefined;
export const PRODUCTION_SITE_URL = (envSiteUrl || 'https://rockychen.me').replace(/\/+$/, '');

export const siteConfig: SiteConfig = {
  siteName: {
    'zh-CN': '技术笔记与系统架构',
    'en': 'Tech Notes & Systems Architecture',
    'fr': 'Notes Techniques et Architecture',
    'de': 'Tech-Notizen & Systemarchitektur',
    'ja': '技術ノートとシステム設計',
  },
  siteDescription: {
    'zh-CN': '面向 IT 从业者的个人技术博客与长期知识积累系统，专注于软件工程、AI Agent、前端架构与系统设计。',
    'en': 'A personal technical blog and long-term knowledge system for software engineering, AI agents, frontend, and system design.',
    'fr': 'Blog technique personnel et système de connaissances axé sur le génie logiciel, les agents IA, le frontend et l’architecture système.',
    'de': 'Ein persönlicher technischer Blog und Wissenssystem für Software-Engineering, KI-Agenten, Frontend und Systemdesign.',
    'ja': 'ソフトウェア工学、AIエージェント、フロントエンド、システム設計のための個人技術ブログと知識蓄積システム。',
  },
  siteUrl: PRODUCTION_SITE_URL,
  defaultLocale: 'zh-CN',
  supportedLocales: ['zh-CN', 'en', 'fr', 'de', 'ja'],
  author: {
    name: 'Rocky',
    bio: {
      'zh-CN': '专注于软件工程、AI Agent 实践、前端架构与长期系统设计的 IT 工程师。',
      'en': 'Software engineer focused on AI agents, frontend architecture, and resilient system design.',
      'fr': 'Ingénieur logiciel axé sur les agents IA, l’architecture frontend et la conception de systèmes.',
      'de': 'Software-Ingenieur mit Fokus auf KI-Agenten, Frontend-Architektur und Systemdesign.',
      'ja': 'AIエージェント、フロントエンド設計、堅牢なシステム設計に注力するソフトウェアエンジニア。',
    },
    avatar: '/avatar.svg',
    social: {
      // Configurable real accounts (leave undefined when unknown - never fabricated)
      github: undefined,
      x: undefined,
      linkedin: undefined,
      email: undefined,
    },
  },
  categories: [
    {
      id: 'engineering',
      name: {
        'zh-CN': '软件工程',
        'en': 'Engineering',
        'fr': 'Ingénierie',
        'de': 'Engineering',
        'ja': 'ソフトウェア工学',
      },
      description: {
        'zh-CN': '软件工程原则、系统可维护性、分布式架构与工程实践。',
        'en': 'Software engineering principles, maintainability, distributed architecture, and craft.',
        'fr': 'Principes de génie logiciel, maintenabilité, architectures distribuées et pratiques.',
        'de': 'Software-Engineering-Prinzipien, Wartbarkeit, verteilte Architekturen und Praktiken.',
        'ja': 'ソフトウェア工学の原則、保守性、分散アーキテクチャ、実践手法。',
      },
    },
    {
      id: 'ai',
      name: {
        'zh-CN': '人工智能与 Agent',
        'en': 'AI & Agents',
        'fr': 'IA et Agents',
        'de': 'KI & Agenten',
        'ja': 'AIとエージェント',
      },
      description: {
        'zh-CN': '大语言模型、Autonomous Agents、提示工程与智能系统落地方案。',
        'en': 'Large language models, autonomous agents, prompt engineering, and intelligent systems.',
        'fr': 'Grands modèles linguistiques, agents autonomes, prompt engineering et systèmes IA.',
        'de': 'Große Sprachmodelle, autonome Agenten, Prompt Engineering und intelligente Systeme.',
        'ja': '大規模言語モデル、自律エージェント、プロンプト工学、AIシステム構築。',
      },
    },
    {
      id: 'frontend',
      name: {
        'zh-CN': '前端与 Web 技术',
        'en': 'Frontend & Web',
        'fr': 'Frontend et Web',
        'de': 'Frontend & Web',
        'ja': 'フロントエンドとWeb',
      },
      description: {
        'zh-CN': '现代 Web 框架、静态站点生成、浏览器渲染机制与性能工程。',
        'en': 'Modern Web frameworks, static site generation, browser internals, and web performance.',
        'fr': 'Frameworks Web modernes, génération de sites statiques et performances du Web.',
        'de': 'Moderne Web-Frameworks, statische Seitengenerierung und Web-Performance.',
        'ja': 'モダンWebフレームワーク、静的サイト生成、ブラウザ内部動作と性能向上。',
      },
    },
    {
      id: 'design-ux',
      name: {
        'zh-CN': '设计与体验',
        'en': 'Design & UX',
        'fr': 'Design et UX',
        'de': 'Design & UX',
        'ja': 'デザインとUX',
      },
      description: {
        'zh-CN': '技术与设计的交汇点：设计系统、交互体验、排版美学与可用性。',
        'en': 'The intersection of tech and design: design systems, UX patterns, and typography.',
        'fr': 'Intersection technique et design : design systems, expérience utilisateur et typographie.',
        'de': 'Schnittstelle von Technik und Design: Design-Systeme, UX-Muster und Typografie.',
        'ja': '技術とデザインの融合：デザインシステム、UXパターン、組版とアクセシビリティ。',
      },
    },
    {
      id: 'notes',
      name: {
        'zh-CN': '技术笔记与复盘',
        'en': 'Technical Notes',
        'fr': 'Notes Techniques',
        'de': 'Technische Notizen',
        'ja': '技術ノートと振り返り',
      },
      description: {
        'zh-CN': '实验记录、工具链评估、踩坑排错经验与项目复盘。',
        'en': 'Experimental logs, tooling evaluations, troubleshooting, and postmortems.',
        'fr': 'Carnets d’expérimentation, évaluation d’outils, retours d’expérience et bilans.',
        'de': 'Experimentelle Protokolle, Tool-Evaluationen, Fehlerbehebung und Retrospektiven.',
        'ja': '実験記録、ツール選定、トラブルシューティング、プロジェクトの振り返り。',
      },
    },
  ],
};
