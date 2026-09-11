import { RawContentFile } from '../lib/contentEngine';

export const rawSampleArticles: RawContentFile[] = [
  // Article 1: zh-CN
  {
    filePath: 'content/blog/2026/designing-personal-publication/zh-CN.mdx',
    rawText: `---
title: "重新思考数字出版：一本静态杂志的诞生"
description: "探索如何摆脱传统技术博客的信息过载，回归文字、摄影与排版共鸣的编辑式数字杂志体验。"
pubDate: "2026-09-11"
updatedDate: "2026-09-12"
slug: "designing-personal-publication"
translationId: "designing-personal-publication"
lang: "zh-CN"
category: "technology"
tags:
  - architecture
  - static-web
  - typography
cover: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "X"
    url: "https://x.com/sample/status/123456"
    type: "announcement"
  - platform: "Medium"
    url: "https://medium.com/@sample/rethinking-digital-publishing"
    type: "full-post"
---

在当今瞬息万变的数字化浪潮中，大多数个人技术网站已经退化为流水线式的代码备忘录或充满噪点的社交信息流。我们习惯了算法驱动的推流，却逐渐遗忘了二十世纪经典独立出版物那种沉甸甸的阅读质感。

真正的出版物不应该仅仅是“渲染 Markdown 的容器”，它应该是一场经过深思熟虑的策展体验。

## 视觉与文字的有机共振

现代屏幕的分辨率与色彩表现力已经超越了传统铜版纸印刷，但绝大多数博客的排版依然停留在二十年前的简陋单栏。我们参考了类似 *Adventure.com* 等先锋杂志的视觉语言：大面积的考究留白、精确计算的比例网格、克制而富有呼吸感的字体层级。

<Note type="quote" title="设计手记">
“文字赋予思想以骨架，摄影赋予空间以灵魂，而留白则是两者共鸣时的静默回声。”
</Note>

当读者翻开一篇文章时，首先迎接他们的是具有叙事纵深感的封面巨幅影像，随后才是精心调整字距与行高的优雅正文。

<Figure
  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
  alt="图书馆中沉静的光影与排版书刊"
  caption="纸质出版物的触感与数字屏幕排版的几何对齐探索"
  layout="wide"
  credit="Linus Chen / 2026"
/>

## 静态至上的工程哲学

为什么我们坚持放弃任何后端数据库、摒弃重型全栈运行时？

1. **绝对的持久性（Permanence）**：纯静态文件可以在数十年后依然完好无损地在任何静态网络上被解析，无需担心依赖过时或服务迁移。
2. **极低的认知负荷（Low Maintenance）**：作者的全部精力应当专注于内容雕琢。一篇文章就是一个自包含的文件单元，配合 Git 的提交即完成全球分发。
3. **极速与可访问性（Zero Lag）**：没有任何运行时查询阻碍读者的视线，秒开的静态 HTML 带来尊严与舒适感。

## 多语言并非装饰，而是世界观

很多个人网站将国际化视作一种“技术展示”或是“未来预留”。但在全球化的独立思辨中，同一种思想在中文的含蓄留白、英文的逻辑严谨与法文的优雅修辞中会呈现截然不同的生命力。

我们通过稳定的 \`translationId\` 将五种语言紧密连接，同时保证每个语言版本拥有独立的文化语境与外部社交延伸。这才是面向未来的个人出版物应有的形态。
`,
  },

  // Article 1: en
  {
    filePath: 'content/blog/2026/designing-personal-publication/en.mdx',
    rawText: `---
title: "Rethinking Digital Publishing: The Genesis of a Static Magazine"
description: "How to transcend generic developer blog templates and rediscover the resonance of typography, photography, and editorial restraint."
pubDate: "2026-09-11"
slug: "rethinking-digital-publishing"
translationId: "designing-personal-publication"
lang: "en"
category: "technology"
tags:
  - architecture
  - static-web
  - typography
cover: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "X"
    url: "https://x.com/sample/status/123456"
    type: "announcement"
  - platform: "LinkedIn"
    url: "https://linkedin.com/pulse/rethinking-digital-publishing"
    type: "adapted"
---

In an era saturated with ephemeral social streams and algorithmic noise, personal blogs have often devolved into mechanical Markdown repositories. We have gained instant distribution, but lost the deliberate cadence of independent print periodicals.

A true publication is not merely a pipeline for HTML text; it is an orchestrated sensory encounter.

## Typography and Imagery in Concert

Modern displays boast color gamuts and crispness that dwarf physical presswork. Yet, web design frequently reduces editorial thought into monotonous boilerplate cards. Drawing inspiration from editorial landmarks like *Adventure.com*, this publication anchors itself upon expansive whitespace, disciplined proportions, and typography that breathes.

<Note type="quote" title="Editorial Memorandum">
"Words give structure to human intellect; photography gives presence to reality; whitespace is the silence in which both reverberate."
</Note>

The reader is initially greeted not by marketing distractions, but by photography imbued with geographical and cultural gravity, followed by text set with mathematical precision.

<Figure
  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
  alt="Books and architectural light within a minimalist library"
  caption="Exploring the intersection of tactile editorial print and digital typography"
  layout="wide"
  credit="Linus Chen / 2026"
/>

## The Architectural Virtue of Static Permanence

Why reject dynamic backends, user databases, and complex server logic?

1. **Permanence**: Static HTML and media assets remain immutable and accessible decades from now, immune to database corruptions or cloud billing shifts.
2. **Minimal Maintenance**: Writing requires tranquility. A folder containing localized MDX and high-resolution assets is Git-committed, validated, and statically deployed.
3. **Pristine Performance**: No blocking queries or bloated hydration runtimes. Content arrives with instantaneous clarity.

## Multilingualism as an Editorial Core

Supporting Chinese, English, French, German, and Japanese is not an afterthought. Across cultures, ideas adapt their weight and cadence. Linked by an immutable \`translationId\`, each language variant maintains autonomous editorial nuance while preserving its collective identity.
`,
  },

  // Article 1: fr
  {
    filePath: 'content/blog/2026/designing-personal-publication/fr.mdx',
    rawText: `---
title: "Repenser l’Édition Numérique : Genèse d’une Revue Statique"
description: "Dépasser la monotonie des blogs techniques conventionnels pour retrouver l’élégance typographique, photographique et éditoriale d'une revue."
pubDate: "2026-09-11"
slug: "repenser-edition-numerique"
translationId: "designing-personal-publication"
lang: "fr"
category: "technology"
tags:
  - architecture
  - static-web
  - typography
cover: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "Medium"
    url: "https://medium.com/@sample/repenser-edition-numerique"
    type: "full-post"
---

Dans un univers numérique saturé d’instantanéité et d’algorithmes distrayants, les blogs personnels ont trop souvent été réduits à de simples dépôts de code sans âme. Nous avons gagné la vitesse, mais perdu la noblesse des publications indépendantes.

Une publication véritable n'est pas un simple moteur de rendu Markdown : c'est un acte de composition littéraire et visuelle.

## Harmonisation entre Typographie et Photographie

Nos écrans contemporains surpassent les plus belles impressions papier. Pourtant, l'espace numérique reste souvent confiné dans des grilles rigides. En nous inspirant de revues éditoriales audacieuses telles que *Adventure.com*, nous privilégions les silences visuels, les blancs généreux et une hiérarchie typographique sculptée avec soin.

<Note type="quote" title="Carnet d'Édition">
« Les mots érigent l'architecture de la pensée ; la photographie incarne le monde sensible ; le vide est l'espace où s'épanouit leur résonance. »
</Note>

Le lecteur est d'abord accueilli par une photographie d'auteur à grande échelle, avant de plonger dans une lecture fluide et apaisée.

<Figure
  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
  alt="Rayons de lumière sur des reliures dans une bibliothèque"
  caption="Recherche d'harmonie entre le classicisme du livre et la clarté du web statique"
  layout="wide"
  credit="Linus Chen / 2026"
/>

## La Pérennité du Tout-Statique

En refusant délibérément les bases de données et les serveurs complexes, nous garantissons une pérennité absolue : ces pages existeront encore dans vingt ans, inaltérées, rapides et fidèles à leur auteur.
`,
  },

  // Article 1: de
  {
    filePath: 'content/blog/2026/designing-personal-publication/de.mdx',
    rawText: `---
title: "Digitales Publizieren neu gedacht: Genesis eines statischen Magazins"
description: "Wie wir gängige Blog-Schablonen überwinden und zur Synthese aus Typografie, Fotografie und redaktioneller Tiefe zurückkehren."
pubDate: "2026-09-11"
slug: "digitales-publizieren-neu-gedacht"
translationId: "designing-personal-publication"
lang: "de"
category: "technology"
tags:
  - architecture
  - static-web
  - typography
cover: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "LinkedIn"
    url: "https://linkedin.com/pulse/digitales-publizieren"
    type: "adapted"
---

In einer Ära, die von flüchtigen Algorithmen und Reizüberflutung geprägt ist, sind persönliche Blogs oft zu sterilen Markdown-Sammlungen verkümmert. Wir haben zwar an Geschwindigkeit gewonnen, aber die sorgfältige Haltung gedruckter Zeitschriften verloren.

Eine Publikation darf nicht bloß HTML rendern; sie muss ein gestalteter Raum für konzentriertes Lesen sein.

## Redaktionelle Typografie und Bildsprache

Moderne Bildschirme bieten heute eine visuelle Tiefe, die dem klassischen Buchdruck in nichts nachsteht. Inspiriert von visuellen Vorbildern wie *Adventure.com* setzen wir auf großzügigen Weißraum, unaufdringliche Eleganz und eine Typografie von kompromissloser Präzision.

<Note type="quote" title="Werkstattnotiz">
„Typografie verleiht dem Gedanken Struktur; Fotografie verankert ihn in der Realität; und der leere Raum ist der Ort, an dem beides nachklingt.“
</Note>

<Figure
  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
  alt="Lichtfall in einer zeitlosen Bibliothek"
  caption="Die Schnittmenge aus klassischem Buchdesign und puristischer statischer Webarchitektur"
  layout="wide"
  credit="Linus Chen / 2026"
/>

## Dauerhaftigkeit durch statische Architektur

Ohne relationale Datenbanken, ohne Serverlast und ohne unnötige Abhängigkeiten bleibt dieses Werk für Jahrzehnte im Git-Repositorium unverändert bestehen und global mit Höchstgeschwindigkeit abrufbar.
`,
  },

  // Article 1: ja
  {
    filePath: 'content/blog/2026/designing-personal-publication/ja.mdx',
    rawText: `---
title: "デジタル出版の再考：静的マガジンの誕生"
description: "画一的な技術ブログの枠組みを超え、タイポグラフィ、写真、そして編集の調和を取り戻す試み。"
pubDate: "2026-09-11"
slug: "rethinking-digital-publishing-ja"
translationId: "designing-personal-publication"
lang: "ja"
category: "technology"
tags:
  - architecture
  - static-web
  - typography
cover: "https://images.unsplash.com/photo-1507842229451-7f01be837a27?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "X"
    url: "https://x.com/sample/status/123456"
    type: "announcement"
---

情報が氾濫し、SNSのタイムラインが即時性のみを消費する現代において、個人の技術ブログはいつしか無機質なMarkdownの保管庫へと変貌してしまいました。

真の出版物とは、単にHTMLを吐き出すパイプラインではなく、読者との間に生まれる静謐な対話の場であるべきです。

## 視覚と言葉の共鳴

紙の印刷物が持つ手触りと美意識を、現代の高精細ディスプレイの上に再構築すること。*Adventure.com* などの先駆的なエディトリアルデザインから着想を得て、広々とした余白、計算されたグリッド、そして呼吸する活字の階層を設計しました。

<Note type="quote" title="編集の覚書">
「言葉は思考に骨格を与え、写真は世界の実在を宿し、余白はその両者が響き合うための静寂である。」
</Note>

<Figure
  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
  alt="静まり返る書架と差し込む自然光"
  caption="伝統的な書籍の組版と、静的Webの幾何学的美学の融合"
  layout="wide"
  credit="Linus Chen / 2026"
/>

## 静的生成がもたらす永続性

データベースもサーバー側ロジックも持たない「完全静的構造」は、数十年の時を経ても劣化することなく、世界中どこからでも瞬時に読み込まれます。書くことへの純粋な集中がここにあります。
`,
  },

  // Article 2: zh-CN (Quiet Craft of Systems)
  {
    filePath: 'content/blog/2026/quiet-craft-of-systems/zh-CN.mdx',
    rawText: `---
title: "系统工匠的沉思：关于极简与持久性"
description: "为什么在日新月异的技术浪潮中，选择更少的技术依赖与更原始的静态介质才是对工程最好的敬畏。"
pubDate: "2026-08-28"
slug: "quiet-craft-of-systems"
translationId: "quiet-craft-of-systems"
lang: "zh-CN"
category: "opinion"
tags:
  - craftsmanship
  - systems
  - philosophy
cover: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "知乎"
    url: "https://zhihu.com/p/12345678"
    type: "full-post"
  - platform: "小红书"
    url: "https://xiaohongshu.com/discovery/item/12345678"
    type: "announcement"
---

软件工业有一股强烈的向心力：不断诱导工程师使用更复杂的工具链、更繁重的分层架构与更多难以自圆其说的抽象。我们为了解决一个不存在的并发问题引入集群，为了发布几篇散文搭建包含多台微服务的庞然大物。

但当我们回望技术史上的经典作品，留在时间深处的往往是极致的简洁与克制。

## 复杂性的虚妄

每一行引入的代码都是未来的负债，每一个托管的外部数据库都是潜在的单点故障。许多现代系统的脆弱性并非源于算力不足，而是源于不加节制的熵增。

<Figure
  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
  alt="直插云霄的现代建筑线条"
  caption="结构的强度来自于清晰的承重逻辑，而非繁复的装饰"
  layout="standard"
  credit="Linus Chen / 2026"
/>

## 留存百年的文字

如果一份文献希望经历半个世纪依然能被后人查阅，它的最佳载体绝对不是某种私有的云数据库表，而是一个被 Git 追踪的纯文本 Markdown 文件与几张标准的 JPEG 图像。

无论渲染引擎如何演进，文字的 UTF-8 编码始终如岩石般坚固。保持简单，正是为了对抗遗忘。
`,
  },

  // Article 2: en
  {
    filePath: 'content/blog/2026/quiet-craft-of-systems/en.mdx',
    rawText: `---
title: "The Quiet Craft of Systems: On Minimalism and Permanence"
description: "Why shedding excessive dependencies and embracing primitive static mediums constitutes the highest reverence for software engineering."
pubDate: "2026-08-28"
slug: "quiet-craft-of-systems"
translationId: "quiet-craft-of-systems"
lang: "en"
category: "opinion"
tags:
  - craftsmanship
  - systems
  - philosophy
cover: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
featured: true
draft: false
author: "Linus Chen"
canonicalUrl: ""
links:
  - platform: "X"
    url: "https://x.com/sample/status/craft-systems"
    type: "announcement"
  - platform: "LinkedIn"
    url: "https://linkedin.com/pulse/quiet-craft-systems"
    type: "full-post"
---

There exists an intoxicating pull within contemporary software culture toward runaway complexity. Engineers are conditioned to adopt layered abstractions, distributed orchestrations, and transient frameworks to solve hypothetical scalability problems.

Yet, when we look back across the history of enduring artifacts, true longevity invariably belongs to ascetic discipline and simplicity.

## The Illusion of Complexity

Every dependency added is a technical mortgage on tomorrow; every stateful cloud database is a future migration emergency. Resilient systems are not those with the highest number of moving parts, but those whose foundational assumptions are so lean they refuse to break.

<Figure
  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
  alt="Clean geometric lines of structural architecture"
  caption="Structural resilience derives from clear load-bearing paths, not superfluous ornamentation"
  layout="standard"
  credit="Linus Chen / 2026"
/>

## Words Meant to Endure Decades

If a piece of writing is meant to survive half a century, its ideal vessel is not a proprietary cloud database row, but a plain UTF-8 text file tracked by Git and paired with standard media files. Simplicity is our only reliable weapon against digital oblivion.
`,
  },

  // Article 3: zh-CN (Large Format Perspectives)
  {
    filePath: 'content/blog/2026/large-format-perspectives/zh-CN.mdx',
    rawText: `---
title: "大画幅视野：用光影捕捉建筑的呼吸与静默"
description: "在快门与移轴镜头之间，记录城市几何线条中的秩序感与时间沉淀。"
pubDate: "2026-07-15"
slug: "large-format-perspectives"
translationId: "large-format-perspectives"
lang: "zh-CN"
category: "photography"
tags:
  - photography
  - architecture
  - visual
cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
featured: false
draft: false
author: "Linus Chen"
canonicalUrl: ""
---

摄影不仅是对瞬间的定格，更是一种关于空间的精密测量。当我们架起大画幅相机，调整移轴水平仪，眼前的建筑便剥离了城市的喧嚣，还原为纯粹的光影节奏。

## 几何对称与光线雕塑

晨曦与黄昏时刻，低角度的光线如刀锋般切过混凝土与玻璃幕墙，勾勒出建筑师在图纸上构想了数十载的几何韵律。

<Figure
  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
  alt="极简室内空间中的自然光投影"
  caption="阴影不仅是光线的缺失，更是空间尺度的度量衡"
  layout="wide"
  credit="Linus Chen / 2026"
/>

出版物的版式设计如同建筑设计：标题是梁柱，段落是墙面，留白则是穿堂而过的清风。
`,
  },

  // Article 3: en (Large Format Perspectives)
  {
    filePath: 'content/blog/2026/large-format-perspectives/en.mdx',
    rawText: `---
title: "Large Format Perspectives: Capturing Architectural Silence"
description: "Between perspective control lenses and deliberate shutter releases, capturing the rhythm and geometry of modern structures."
pubDate: "2026-07-15"
slug: "large-format-perspectives"
translationId: "large-format-perspectives"
lang: "en"
category: "photography"
tags:
  - photography
  - architecture
  - visual
cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
featured: false
draft: false
author: "Linus Chen"
canonicalUrl: ""
---

Photography is not merely the capture of an instant; it is an act of rigorous spatial measurement. When setting up a perspective control system, the chaos of city life fades, leaving behind only the pure interplay of concrete, glass, and shadow.

## Geometry and Sculptural Light

At dawn, low rake lighting cuts across brutalist surfaces like a scalpel, illuminating the structural rhythms envisioned decades earlier on drafting tables.

<Figure
  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
  alt="Natural illumination cast across a minimalist architectural space"
  caption="Shadow is not the absence of light, but the very gauge of spatial volume"
  layout="wide"
  credit="Linus Chen / 2026"
/>

The composition of an editorial publication mirrors architecture: headlines form the columns, paragraphs form the walls, and whitespace is the air circulating between them.
`,
  },
];
