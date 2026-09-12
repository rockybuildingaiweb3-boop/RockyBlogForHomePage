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
      'zh-CN': '系统架构',
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
  'react': {
    id: 'react',
    name: {
      'zh-CN': 'React',
      'en': 'React',
      'fr': 'React',
      'de': 'React',
      'ja': 'React',
    },
    description: {
      'zh-CN': 'React 生态、并发特性、状态管理与组件工程。',
      'en': 'React ecosystem, concurrent features, state management, and component design.',
      'fr': 'Écosystème React, fonctionnalités concurrentes et gestion d’état.',
      'de': 'React-Ökosystem, gleichzeitige Features und Zustandsverwaltung.',
      'ja': 'Reactエコシステム、並行機能、状態管理、コンポーネント工学。',
    },
  },
  'typescript': {
    id: 'typescript',
    name: {
      'zh-CN': 'TypeScript',
      'en': 'TypeScript',
      'fr': 'TypeScript',
      'de': 'TypeScript',
      'ja': 'TypeScript',
    },
    description: {
      'zh-CN': '静态类型系统、类型推导、工程化与严谨代码质量。',
      'en': 'Static type system, type gymnastics, and engineering safety.',
      'fr': 'Système de typage statique, inférence et sécurité du code.',
      'de': 'Statisches Typensystem, Typinferenz und Code-Sicherheit.',
      'ja': '静的型システム、型推論、エンジニアリングの信頼性。',
    },
  },
  'astro': {
    id: 'astro',
    name: {
      'zh-CN': 'Astro',
      'en': 'Astro',
      'fr': 'Astro',
      'de': 'Astro',
      'ja': 'Astro',
    },
    description: {
      'zh-CN': '内容驱动型网站架构、群岛渲染机制与静态站点构建。',
      'en': 'Content-driven web architecture, Islands architecture, and static builds.',
      'fr': 'Architecture Web orientée contenu et génération de sites statiques.',
      'de': 'Inhaltsorientierte Webarchitektur und statische Seitenerstellung.',
      'ja': 'コンテンツ駆動型Webアーキテクチャと静的ビルド。',
    },
  },
  'nextjs': {
    id: 'nextjs',
    name: {
      'zh-CN': 'Next.js',
      'en': 'Next.js',
      'fr': 'Next.js',
      'de': 'Next.js',
      'ja': 'Next.js',
    },
    description: {
      'zh-CN': 'React 服务端渲染、流式传输、App Router 与全栈工程。',
      'en': 'React server components, streaming SSR, and fullstack engineering.',
      'fr': 'Composants serveur React, SSR en streaming et développement fullstack.',
      'de': 'React-Server-Komponenten, Streaming und Fullstack-Engineering.',
      'ja': 'Reactサーバーコンポーネント、ストリーミング、フルスタック工学。',
    },
  },
  'ai': {
    id: 'ai',
    name: {
      'zh-CN': '人工智能',
      'en': 'Artificial Intelligence',
      'fr': 'Intelligence Artificielle',
      'de': 'Künstliche Intelligenz',
      'ja': '人工知能',
    },
    description: {
      'zh-CN': '现代 AI 技术落地、前沿算法实践与工程转化。',
      'en': 'Applied modern AI, state-of-the-art implementations, and system integration.',
      'fr': 'Applications modernes de l’IA et intégration de systèmes intelligents.',
      'de': 'Angewandte moderne KI und intelligente Systemintegration.',
      'ja': '実践的な最新AI技術とシステム統合。',
    },
  },
  'llm': {
    id: 'llm',
    name: {
      'zh-CN': '大语言模型',
      'en': 'LLM',
      'fr': 'LLM',
      'de': 'LLM',
      'ja': '大規模言語モデル',
    },
    description: {
      'zh-CN': '大型语言模型调用、上下文窗口设计与微调推理实践。',
      'en': 'Large language model workflows, context engineering, and inference tuning.',
      'fr': 'Modèles linguistiques de grande taille, ingénierie de contexte et inférence.',
      'de': 'Große Sprachmodelle, Kontext-Engineering und Inferenz.',
      'ja': '大規模言語モデル、コンテキスト設計、推論の最適化。',
    },
  },
  'agents': {
    id: 'agents',
    name: {
      'zh-CN': 'AI 智能体',
      'en': 'Agents',
      'fr': 'Agents',
      'de': 'Agenten',
      'ja': 'AIエージェント',
    },
    description: {
      'zh-CN': '自主智能体架构、工具调用、计划推理与多 Agent 协作。',
      'en': 'Autonomous agent systems, tool use, reasoning loops, and multi-agent coordination.',
      'fr': 'Systèmes d’agents autonomes, appel d’outils et coordination multi-agents.',
      'de': 'Autonome Agentensysteme, Tool-Calling und Multi-Agenten-Koordination.',
      'ja': '自律型エージェント、ツール呼び出し、マルチエージェント協調。',
    },
  },
  'web-performance': {
    id: 'web-performance',
    name: {
      'zh-CN': 'Web 性能工程',
      'en': 'Web Performance',
      'fr': 'Performance Web',
      'de': 'Web-Performance',
      'ja': 'Webパフォーマンス',
    },
    description: {
      'zh-CN': 'Core Web Vitals 指标优化、加载时延削减与渲染瓶颈排查。',
      'en': 'Core Web Vitals optimization, runtime latency tuning, and lean asset delivery.',
      'fr': 'Optimisation des signaux Web essentiels et réduction des latences.',
      'de': 'Core Web Vitals, Latenzoptimierung und schlanke Ressourcenbereitstellung.',
      'ja': 'コアウェブバイタル、実行時レイテンシのチューニング、配信最適化。',
    },
  },
  'css': {
    id: 'css',
    name: {
      'zh-CN': 'CSS',
      'en': 'CSS',
      'fr': 'CSS',
      'de': 'CSS',
      'ja': 'CSS',
    },
    description: {
      'zh-CN': '现代 CSS 规范、网格布局、容器查询与渲染层叠上下文。',
      'en': 'Modern CSS specifications, CSS Grid, container queries, and layout engines.',
      'fr': 'Spécifications CSS modernes, grilles, requêtes de conteneur et mise en page.',
      'de': 'Moderne CSS-Spezifikationen, Grid, Container Queries und Layout.',
      'ja': '最新CSS仕様、Grid、コンテナクエリ、レイアウト制御。',
    },
  },
  'tailwind': {
    id: 'tailwind',
    name: {
      'zh-CN': 'Tailwind CSS',
      'en': 'Tailwind CSS',
      'fr': 'Tailwind CSS',
      'de': 'Tailwind CSS',
      'ja': 'Tailwind CSS',
    },
    description: {
      'zh-CN': '原子化 CSS 实践、设计令牌与构建时样式编译。',
      'en': 'Utility-first styling, design tokens, and build-time stylesheet compilation.',
      'fr': 'Style utilitaire, tokens de design et compilation optimisée.',
      'de': 'Utility-first Styling, Design-Tokens und Build-Zeit-Kompilierung.',
      'ja': 'ユーティリティファーストCSS、デザイントークン、ビルド時最適化。',
    },
  },
  'ux': {
    id: 'ux',
    name: {
      'zh-CN': '用户体验',
      'en': 'User Experience',
      'fr': 'Expérience Utilisateur',
      'de': 'User Experience',
      'ja': 'ユーザー体験',
    },
    description: {
      'zh-CN': '交互设计模型、无障碍访问（a11y）、信息层次与用户心智。',
      'en': 'Interaction models, accessibility (a11y), visual hierarchy, and user cognition.',
      'fr': 'Modèles d’interaction, accessibilité numérique et hiérarchie visuelle.',
      'de': 'Interaktionsmodelle, Barrierefreiheit (a11y) und visuelle Hierarchie.',
      'ja': 'インタラクションモデル、アクセシビリティ、視覚階層、認知負荷の低減。',
    },
  },
  'design-systems': {
    id: 'design-systems',
    name: {
      'zh-CN': '设计系统',
      'en': 'Design Systems',
      'fr': 'Systèmes de Design',
      'de': 'Design-Systeme',
      'ja': 'デザインシステム',
    },
    description: {
      'zh-CN': '设计与代码的单一可信源、组件规范与跨端设计令牌。',
      'en': 'Single source of truth for UI, component tokens, and scalable styling.',
      'fr': 'Source unique de vérité pour l’interface, tokens et composants réutilisables.',
      'de': 'Zentrale UI-Wahrheitsquelle, Komponenten-Tokens und Skalierbarkeit.',
      'ja': 'UIの単一の信頼できる情報源、デザイントークン、再利用可能コンポーネント。',
    },
  },
  'github': {
    id: 'github',
    name: {
      'zh-CN': 'GitHub & CI/CD',
      'en': 'GitHub & CI/CD',
      'fr': 'GitHub et CI/CD',
      'de': 'GitHub & CI/CD',
      'ja': 'GitHubとCI/CD',
    },
    description: {
      'zh-CN': '版本控制工作流、GitHub Actions 自动化与发布流水线。',
      'en': 'Version control workflows, GitHub Actions, and automated deployment pipelines.',
      'fr': 'Gestion de versions, automatisations GitHub Actions et pipelines de livraison.',
      'de': 'Versionskontroll-Workflows, GitHub Actions und Bereitstellungspipelines.',
      'ja': 'バージョン管理、GitHub Actions自動化、デプロイパイプライン。',
    },
  },
  'cloudflare': {
    id: 'cloudflare',
    name: {
      'zh-CN': 'Cloudflare & 边缘计算',
      'en': 'Cloudflare & Edge',
      'fr': 'Cloudflare et Edge',
      'de': 'Cloudflare & Edge',
      'ja': 'Cloudflareとエッジコンピューティング',
    },
    description: {
      'zh-CN': '边缘网络分发、Workers 无服务器运行时与静态资源缓存架构。',
      'en': 'Global edge networks, Workers serverless runtime, and asset caching strategies.',
      'fr': 'Réseaux de périphérie mondiaux, Workers serverless et stratégies de cache.',
      'de': 'Globale Edge-Netzwerke, Workers-Serverless-Runtime und Caching-Strategien.',
      'ja': 'グローバルエッジネットワーク、Workersサーバーレス、キャッシュ設計。',
    },
  },
  'static-web': {
    id: 'static-web',
    name: {
      'zh-CN': '静态 Web 架构',
      'en': 'Static Web',
      'fr': 'Web Statique',
      'de': 'Statisches Web',
      'ja': '静的Web',
    },
    description: {
      'zh-CN': '现代静态站点生成、预渲染流水线与去中心化文件托管。',
      'en': 'Modern static site generation, pre-rendering pipelines, and durable hosting.',
      'fr': 'Génération de sites statiques modernes et hébergement décentralisé.',
      'de': 'Moderne statische Site-Generierung und robuste Bereitstellung.',
      'ja': 'モダン静的サイト生成、事前レンダリング、堅牢なホスティング。',
    },
  },
  'markdown': {
    id: 'markdown',
    name: {
      'zh-CN': 'Markdown 工具链',
      'en': 'Markdown Tooling',
      'fr': 'Écosystème Markdown',
      'de': 'Markdown-Werkzeuge',
      'ja': 'Markdownツールチェーン',
    },
    description: {
      'zh-CN': '纯文本自包含知识沉淀、AST 转换、MDX 扩展与文档系统。',
      'en': 'Plain text authorship, AST processing, MDX extensions, and documentation craft.',
      'fr': 'Écriture en texte brut, parsing AST, MDX et ingénierie documentaire.',
      'de': 'Klartext-Autorenschaft, AST-Verarbeitung, MDX und Dokumentationswerkzeuge.',
      'ja': 'プレーンテキスト執筆、AST変換、MDX拡張、ドキュメント工学。',
    },
  },
  'tools': {
    id: 'tools',
    name: {
      'zh-CN': '开发工具与工作流',
      'en': 'Tools & Workflow',
      'fr': 'Outils et Flux de travail',
      'de': 'Tools & Workflows',
      'ja': 'ツールと開発環境',
    },
    description: {
      'zh-CN': '开发者效率工具、命令行环境、调试器与自动化脚本。',
      'en': 'Developer productivity tools, CLI utilities, debuggers, and automation scripts.',
      'fr': 'Outils de productivité pour développeurs, CLI et scripts d’automatisation.',
      'de': 'Entwickler-Tools, CLI-Dienstprogramme und Automatisierungsskripte.',
      'ja': '開発者向け生産性向上ツール、CLI、デバッガ、自動化スクリプト。',
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
