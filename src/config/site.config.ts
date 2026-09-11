import { CategoryDefinition, SupportedLocale } from '../types/content';

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

export const siteConfig: SiteConfig = {
  siteName: {
    'zh-CN': '沉思录与技术手记',
    'en': 'Meditations & Tech Notes',
    'fr': 'Méditations et Notes Techniques',
    'de': 'Meditationen & Tech-Notizen',
    'ja': '思索と技術の手記',
  },
  siteDescription: {
    'zh-CN': '专注于个人观点、技术哲学、视觉叙事与长期主义的独立数字出版物。',
    'en': 'An independent digital publication dedicated to personal essays, tech philosophy, and visual narrative.',
    'fr': 'Une publication numérique indépendante consacrée aux essais personnels, à la philosophie technique et au récit visuel.',
    'de': 'Eine unabhängige digitale Publikation über persönliche Essays, Technikphilosophie und visuelle Erzählung.',
    'ja': '個人の見解、技術哲学、視覚的叙事詩、そして長期主義に捧げる独立したデジタル出版物。',
  },
  siteUrl: 'https://ais-pre-76p4kg4ws6q3eqkvf2odho-402194193469.us-west2.run.app',
  defaultLocale: 'zh-CN',
  supportedLocales: ['zh-CN', 'en', 'fr', 'de', 'ja'],
  author: {
    name: 'Linus Chen',
    bio: {
      'zh-CN': '独立作者、工程师与视觉记录者。关注纯粹的内容、优雅的系统设计与历久弥新的思考。',
      'en': 'Independent writer, engineer, and visual chronicler. Focused on pure editorial writing, elegant system craft, and timeless thinking.',
      'fr': 'Écrivain indépendant, ingénieur et chroniqueur visuel. Passionné par l’écriture éditoriale pure et l’art des systèmes élégants.',
      'de': 'Unabhängiger Autor, Ingenieur und visueller Chronist. Fokussiert auf reine redaktionelle Texte und zeitlose Gedanken.',
      'ja': '独立系作家、エンジニア、視覚的記録者。純粋なエディトリアル執筆と普遍的な思考に注力。',
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    social: {
      github: 'https://github.com',
      x: 'https://x.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:contact@example.com',
    },
  },
  categories: [
    {
      id: 'opinion',
      name: {
        'zh-CN': '观点与思索',
        'en': 'Opinions & Essays',
        'fr': 'Opinions et Essais',
        'de': 'Meinungen & Essays',
        'ja': '意見と考察',
      },
      description: {
        'zh-CN': '对数字时代、人文关怀与生活哲学的沉淀与见解。',
        'en': 'Reflections on the digital era, humanism, and personal philosophy.',
        'fr': 'Réflexions sur l’ère numérique, l’humanisme et la philosophie.',
        'de': 'Reflexionen über das digitale Zeitalter, Humanismus und Philosophie.',
        'ja': 'デジタル時代、人間性、生活哲学に関する深い省察。',
      },
    },
    {
      id: 'technology',
      name: {
        'zh-CN': '工程与架构',
        'en': 'Engineering & Craft',
        'fr': 'Ingénierie et Architecture',
        'de': 'Engineering & Handwerk',
        'ja': '工学とアーキテクチャ',
      },
      description: {
        'zh-CN': '静态系统、代码美学与历久弥新的软件工程实践。',
        'en': 'Static systems, software aesthetics, and resilient engineering.',
        'fr': 'Systèmes statiques, esthétique logicielle et ingénierie résiliente.',
        'de': 'Statische Systeme, Code-Ästhetik und robuste Softwarearchitektur.',
        'ja': '静的システム、コードの美学、耐久性のあるソフトウェア工学。',
      },
    },
    {
      id: 'photography',
      name: {
        'zh-CN': '镜头与光影',
        'en': 'Visual Narratives',
        'fr': 'Récits Visuels',
        'de': 'Visuelle Erzählungen',
        'ja': '視覚的叙事詩',
      },
      description: {
        'zh-CN': '通过大画幅摄影记录的地理风貌、城市观察与自然界。',
        'en': 'Large-format photography capturing landscapes, urban textures, and nature.',
        'fr': 'Photographies grand format capturant paysages et textures urbaines.',
        'de': 'Großformatige Fotografie über Landschaften, Städte und die Natur.',
        'ja': '大判写真で捉えた地理的景観、都市観察、そして自然界。',
      },
    },
    {
      id: 'notes',
      name: {
        'zh-CN': '读书与札记',
        'en': 'Field Notes',
        'fr': 'Notes de Lecture',
        'de': 'Feldnotizen',
        'ja': '読書と手記',
      },
      description: {
        'zh-CN': '旅途见闻、经典书籍摘录与零散思想碎片。',
        'en': 'Travel observations, reading highlights, and fragments of ideas.',
        'fr': 'Observations de voyage, notes de lecture et fragments d’idées.',
        'de': 'Reisebeobachtungen, Lektürenotizen und Gedankenfragmente.',
        'ja': '旅の記録、古典の読書メモ、思考の断片。',
      },
    },
  ],
};
