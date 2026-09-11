# 个人观点与技术博客——静态博客需求文档

**项目名称**：个人观点与技术博客  
**文档版本**：v1.4  
**更新日期**：2026-09-11  
**项目类型**：个人静态博客 / 独立内容出版物

---

## 1. 项目概述

### 1.1 项目定位

本项目是一个独立运行的个人博客，与已有个人主页 / Portfolio 明确分离。

博客主要用于发布：

- 个人观点
- 技术文章
- 学习笔记
- 阅读 / 观察 / 思考
- 随笔
- 长篇专题
- 图片与文字结合的内容

博客不承担作品集、项目展示、个人履历等 Portfolio 功能。

核心定位：

> 一个以文字、图片、排版和个人观点为核心的个人数字出版物。

### 1.2 设计目标

视觉参考 `adventure.com` 的编辑式 / 数字杂志设计语言，但不复制其品牌、页面、图片、文案或具体视觉资产。

重点参考：

- Editorial
- Magazine
- Photography-led
- Typography-led
- 大尺寸图片
- 强标题排版
- 大留白
- 清晰内容层级
- 克制动效
- 沉浸式阅读

最终目标：

> 像一本个人数字杂志，而不是一个普通 Markdown 博客模板。

---

## 2. 核心产品原则

### 2.1 Content First

内容优先于 UI。文章标题、图片、正文、排版拥有最高视觉优先级。

### 2.2 Low Maintenance

作者不需要进入 CMS 或后台，内容通过本地文件和 Git 管理：

```text
本地创建 Markdown / MDX
        ↓
加入图片与其他资源
        ↓
填写 Frontmatter
        ↓
Git Commit
        ↓
Git Push
        ↓
自动构建
        ↓
静态部署
```

### 2.3 Static by Default

系统不依赖：

- 数据库
- 后端业务服务
- 用户登录
- CMS
- 评论后端
- 服务器端内容管理

所有公开页面尽可能在构建阶段生成。

---

## 3. 第一阶段必须实现的多语言

多语言不是未来预留功能，而是 **MVP 的硬性需求**。

首期必须完整支持以下五种语言：

| 语言 | 语言名称 | Locale | 状态 |
|---|---|---|---|
| 简体中文 | Chinese (Simplified) | `zh-CN` | 必须 |
| 英语 | English | `en` | 必须 |
| 法语 | Français | `fr` | 必须 |
| 德语 | Deutsch | `de` | 必须 |
| 日语 | 日本語 | `ja` | 必须 |

### 3.1 默认语言

默认语言建议使用 `zh-CN`，但实现上不得把中文硬编码成唯一语言。

默认语言可通过站点配置修改。

### 3.2 UI 国际化

以下内容必须国际化：

- 导航
- Featured
- Latest / Recent
- Category
- Tags
- Archive
- About
- Reading Time
- Previous / Next
- Related Articles
- Also Published On
- 404 页面
- RSS 相关文案（如有）
- 图片 / 视频等组件的辅助文本
- SEO 默认文案

UI 文案必须与文章内容分离，不能把可翻译字符串直接散落在组件中。

### 3.3 内容国际化

文章内容也必须支持五种语言。

一篇文章的不同语言版本应该能够明确建立“翻译关系”。

建议使用稳定的 `translationId`：

```yaml
translationId: "designing-a-personal-blog"
lang: "zh-CN"
```

英文版本：

```yaml
translationId: "designing-a-personal-blog"
lang: "en"
```

法文、德文、日文同理。

这意味着：

> 不同语言版本属于同一篇“逻辑文章”，但可以拥有不同的 slug、发布时间、封面或部分内容。

### 3.4 翻译关系规则

必须支持：

- 某篇文章只有中文版本
- 某篇文章同时拥有中文 + 英文版本
- 某篇文章拥有全部五种语言
- 新语言后来补充，而不破坏原文章 URL

不存在某语言版本时，不应制造空文章。

语言切换器只能展示实际存在的语言版本。

### 3.5 语言切换

文章页必须提供语言切换入口，例如：

```text
中文  English  Français  Deutsch  日本語
```

行为：

- 当前语言高亮
- 切换后进入对应语言版本
- 不存在的语言不显示为可点击状态
- 切换应尽量保持用户当前内容上下文

### 3.6 多语言 URL

推荐采用 locale 前缀：

```text
/zh-cn/
/en/
/fr/
/de/
/ja/
```

例如：

```text
/zh-cn/blog/designing-a-personal-blog
/en/blog/designing-a-personal-blog
/fr/blog/concevoir-un-blog-personnel
/de/blog/einen-persoenlichen-blog-gestalten
/ja/blog/personal-blog-design
```

语言 URL 必须稳定、可分享、可索引。

### 3.7 首页与语言

访问：

```text
/zh-cn/
/en/
/fr/
/de/
/ja/
```

应得到各自语言的首页。

根路径 `/` 的行为必须统一定义，可采用默认语言重定向或静态语言选择页；实现阶段确定，但不得出现随机语言结果。

### 3.8 分类、标签和归档国际化

Category、Tag、Archive 需要支持语言环境。

例如：

```text
/zh-cn/archive
/en/archive
/fr/archive
/de/archive
/ja/archive
```

Category / Tag 的展示名称允许本地化，但内部 ID 应稳定。

例如：

```yaml
id: "technology"
translations:
  zh-CN: "技术"
  en: "Technology"
  fr: "Technologie"
  de: "Technologie"
  ja: "テクノロジー"
```

### 3.9 日期、数字与阅读时间本地化

以下内容需要根据当前 locale 展示：

- 日期格式
- 时间格式（如使用）
- 阅读时间文案
- 数字格式

例如同一阅读时间可能显示为：

```text
8 min read
8 分钟
8 min de lecture
8 Min. Lesezeit
8分で読めます
```

计算逻辑统一，展示文案本地化。

### 3.10 SEO 多语言

每个语言版本都必须支持：

- `title`
- `description`
- canonical
- Open Graph
- Twitter / social metadata
- `hreflang`
- locale-specific sitemap 条目

语言版本应通过 `hreflang` 建立对应关系，例如：

```html
<link rel="alternate" hreflang="zh-CN" href="..." />
<link rel="alternate" hreflang="en" href="..." />
<link rel="alternate" hreflang="fr" href="..." />
<link rel="alternate" hreflang="de" href="..." />
<link rel="alternate" hreflang="ja" href="..." />
```

具体实现由最终技术栈决定。

---

## 4. 内容模型

### 4.1 内容格式

必须同时支持：

- Markdown（`.md`）
- MDX（`.mdx`）

Markdown 用于标准文章。

MDX 用于需要 React Component、特殊内容块或编辑式组件的文章。

### 4.2 MDX 能力

文章中允许直接使用 React Components，例如：

```mdx
<Note>
这是一个重要说明。
</Note>
```

以及：

```mdx
<Figure
  src="./image-01.jpg"
  alt="图片描述"
  caption="图片说明"
/>
```

组件系统应保持轻量、稳定、可维护。

---

## 5. Frontmatter 规范

建议使用以下模型：

```yaml
---
title: "文章标题"
description: "文章简介"

pubDate: "2026-09-11"
updatedDate: "2026-09-12"

slug: "article-slug"
translationId: "stable-article-id"
lang: "zh-CN"

category: "technology"
tags:
  - react
  - design
  - web

cover: "./cover.jpg"

featured: true
draft: false

author: "Author"

canonicalUrl: ""

links:
  - platform: "X"
    url: "https://x.com/..."
    type: "announcement"
---
```

### 5.1 必填字段

- `title`
- `description`
- `pubDate`
- `slug`
- `translationId`
- `lang`
- `category`
- `tags`
- `cover`
- `featured`
- `draft`

### 5.2 可选字段

- `updatedDate`
- `author`
- `canonicalUrl`
- `links`

### 5.3 自动字段

作者不需要手动维护：

- readingTime
- wordCount
- TOC / headings
- 文章 URL
- 构建时间等派生数据

---

## 6. 文章目录结构

推荐采用“**一篇文章 = 一个目录**”的结构：

```text
content/
└── blog/
    └── 2026/
        ├── my-article/
        │   ├── index.mdx
        │   ├── cover.jpg
        │   ├── image-01.jpg
        │   └── image-02.jpg
        │
        └── another-article/
            ├── index.md
            └── cover.jpg
```

多语言可采用语言目录或由内容层映射，最终方案必须满足以下原则：

> 同一篇逻辑文章的不同语言版本可以清晰关联，同时每个版本及其图片资源都可独立维护。

建议优先评估以下形式：

### 方案 A：按语言分目录

```text
content/
├── zh-CN/
│   └── blog/
│       └── 2026/
│           └── my-article/
│               └── index.mdx
├── en/
│   └── blog/
│       └── 2026/
│           └── my-article/
│               └── index.mdx
```

### 方案 B：同一文章目录包含多语言文件

```text
content/
└── blog/
    └── 2026/
        └── my-article/
            ├── zh-CN.mdx
            ├── en.mdx
            ├── fr.mdx
            ├── de.mdx
            ├── ja.mdx
            ├── cover.jpg
            └── image-01.jpg
```

最终技术方案应优先选择：

- 迁移成本低
- Git diff 清晰
- 图片绑定自然
- 翻译关系明确
- 不需要数据库

---

## 7. 图片与媒体资源

### 7.1 图片定位

图片是博客的重要内容资产，而不是单纯装饰。

必须支持：

- Cover
- 正文图片
- 图片说明
- Alt
- 响应式图片
- 图片优化
- Lazy Loading
- 尺寸控制
- 防止 CLS
- 现代图片格式

### 7.2 本地图片为默认方式

推荐：

```text
my-article/
├── index.mdx
├── cover.jpg
├── image-01.jpg
└── image-02.jpg
```

正文：

```markdown
![图片说明](./image-01.jpg)
```

这样可以保证：

- Git 可追踪
- 不依赖第三方图片服务
- 长期稳定
- 文章容易迁移
- 删除文章时资源关系明确

### 7.3 图片组件

MDX 建议支持统一组件：

```mdx
<Figure
  src="./image-01.jpg"
  alt="图片描述"
  caption="图片说明"
  layout="wide"
/>
```

至少应考虑：

- standard
- wide
- full

### 7.4 图片 Alt 与 Caption

图片至少支持：

```text
src
alt
caption
```

`alt` 用于无障碍和语义；`caption` 用于视觉展示。

### 7.5 图片完整性检查

构建时必须检查：

- Cover 是否存在
- 正文图片是否存在
- 路径是否正确
- 是否存在无法解析的资源

关键内容资源缺失时，Production Build 应失败，而不是部署一个破图页面。

### 7.6 外部图片

允许外部 URL，但不作为长期内容默认方案。

原则：

> 长期文章默认优先使用本地图片。

### 7.7 图片版权与来源

系统应允许未来扩展图片来源字段，例如：

```yaml
credit:
  author: "Photographer"
  source: "Source Name"
  url: "https://..."
```

第一版不是所有图片都强制填写，但数据模型应预留。

---

## 8. 封面图

每个语言版本都应允许独立定义 `cover`。

例如不同语言版本可以复用同一封面，也允许使用不同封面。

Cover 应用于：

- 首页 Featured
- 首页 Latest
- Blog 列表
- Category
- Tag
- Related Articles
- Open Graph
- Social Preview

---

## 9. 外部社交 / 内容平台同步发布

博客文章可能会同步发布到其他社交或内容平台。

博客不负责自动发布，但必须记录外部已发布版本的公开链接。

### 9.1 外部链接字段

```yaml
links:
  - platform: "X"
    url: "https://x.com/..."
    type: "announcement"
```

支持多个平台：

- X / Twitter
- LinkedIn
- Medium
- 知乎
- 小红书
- 即刻
- Threads
- 微信公众号
- YouTube
- Bilibili
- 其他平台

平台列表不能硬编码到数据库字段设计中，应允许扩展。

### 9.2 Link 类型

至少预留：

- `announcement`：社交平台主要发布摘要 / 链接
- `full-post`：平台存在完整正文
- `adapted`：针对平台进行了改写

### 9.3 每个语言版本可以拥有不同外链

例如：

```text
中文版本 → 知乎、小红书
英文版本 → X、LinkedIn、Medium
日文版本 → X、其他日语平台
```

所以外部链接应属于**具体语言版本的文章**，而不是统一挂在 `translationId` 上。

### 9.4 外部链接展示

文章正文结束后建议展示：

```text
Also published on

X · LinkedIn · Medium
```

不要在文章顶部占用主要视觉空间。

### 9.5 Canonical

博客原文默认作为 canonical 来源。

支持：

```yaml
canonicalUrl: "https://example.com/en/blog/article-slug"
```

以处理：

- 外部全文转载
- 内容镜像
- 内容重新发布
- 特殊 SEO 情况

### 9.6 不实现自动同步

第一阶段明确不实现：

- 自动发布到 X
- 自动发布到 LinkedIn
- 自动发布到知乎
- 自动发布到 Medium
- 自动同步小红书
- 自动同步公众号
- 自动抓取平台文章

这样可以保持系统纯静态和低维护。

---

## 10. 页面与信息架构

多语言后的页面结构建议为：

```text
/
├── /zh-cn/
│   ├── /blog
│   ├── /blog/[slug]
│   ├── /category/[category]
│   ├── /tags
│   ├── /tag/[tag]
│   ├── /archive
│   └── /about
│
├── /en/
├── /fr/
├── /de/
└── /ja/
```

每个语言环境拥有相同的信息架构，但内容与 UI 文案根据语言变化。

---

## 11. 首页

首页是网站最重要的编辑入口。

建议结构：

```text
Site Introduction

Featured
────────────────
Featured Article
Featured Article
Featured Article

Latest Articles
────────────────
Article
Article
Article

Categories

Archive

About
```

### Featured

通过：

```yaml
featured: true
```

手动控制。

首页建议最多展示 3–5 篇精选文章。

Featured 不改变正常发布时间排序。

### Latest

默认：

```text
pubDate DESC
```

---

## 12. Blog 列表页

路径：

```text
/[locale]/blog
```

显示：

- Cover
- Category
- Title
- Description
- Date
- Reading Time
- Tags（可选）

默认按照发布时间倒序。

---

## 13. 文章页

路径：

```text
/[locale]/blog/[slug]
```

文章页必须包含：

### Header

- Category
- Title
- Description
- Publish Date
- Updated Date（如果存在）
- Reading Time
- Language Switcher

### Cover

高质量展示文章封面。

### Article Body

支持：

- H1–H6
- 段落
- 强调
- 列表
- 引用
- 链接
- 图片
- 表格
- Code Block
- Inline Code
- MDX Components

### Footer

至少：

- Tags
- Also Published On
- Related Articles
- Previous Article
- Next Article
- Language Switcher（移动端可再次出现）

---

## 14. TOC

自动根据标题生成 TOC，主要包含：

- H2
- H3
- H4

必须支持：

- Anchor
- 点击跳转
- URL hash
- 刷新后 hash 定位
- 当前章节状态（推荐）

桌面端可以固定在文章侧边；移动端建议采用折叠或独立入口。

---

## 15. 阅读时间

根据正文内容自动计算。

作者不手动填写。

需要考虑不同语言的文本特性，并统一由 content utility 计算，再由 locale 显示不同文案。

---

## 16. 相关推荐

推荐逻辑保持简单、可预测：

```text
Same Tags
   ↓
Same Category
   ↓
Publication Date
```

展示 2–4 篇。

不实现 AI 推荐。

相关推荐只允许链接到当前语言存在的文章版本；如同一逻辑文章没有当前语言版本，不应强制展示其他语言版本作为替代。

---

## 17. Previous / Next

文章底部支持：

- Previous Article
- Next Article

默认按照当前语言版本的发布时间排序。

如果某语言只有部分文章，则基于该语言真实存在的文章生成相邻关系。

---

## 18. Category 系统

Category 是长期稳定的内容分类。

例如：

```text
technology
design
opinion
notes
life
```

内部建议使用稳定 ID，展示名称可以按语言本地化。

例如：

```yaml
id: "technology"
name:
  zh-CN: "技术"
  en: "Technology"
  fr: "Technologie"
  de: "Technologie"
  ja: "テクノロジー"
```

Category URL：

```text
/[locale]/category/[category]
```

---

## 19. Tag 系统

Tag 用于描述更细粒度主题。

例如：

```text
React
TypeScript
CSS
Design
AI
Books
Web
```

提供：

```text
/[locale]/tags
/[locale]/tag/[tag]
```

标签展示名称可以本地化，但内部 ID 应稳定。

---

## 20. Archive

提供完整按年份归档页面：

```text
/[locale]/archive
```

示例：

```text
2026

September
Article A
Article B

July
Article C

2025

December
Article D
```

归档数据基于当前语言版本构建。

---

## 21. About

提供简单作者介绍，不发展成 Portfolio。

建议包含：

- 简短介绍
- 博客介绍
- 内容方向
- 联系方式
- 社交链接（可选）

About 页面 UI 必须多语言化。

---

## 22. Draft

```yaml
draft: true
```

Production：

- 不展示
- 不进入 RSS
- 不进入 Sitemap
- 不进入 Featured
- 不进入 Related Articles
- 不进入 Category / Tag
- 不进入 Previous / Next

---

## 23. URL 规范

### 文章

```text
/[locale]/blog/[slug]
```

### 分类

```text
/[locale]/category/[category]
```

### 标签

```text
/[locale]/tag/[tag]
```

### 标签总览

```text
/[locale]/tags
```

### 归档

```text
/[locale]/archive
```

### About

```text
/[locale]/about
```

年份不进入文章 URL，以 Archive 表达时间结构。

文章标题修改后，默认不改变 slug。

---

## 24. SEO

每个语言页面都必须自动生成：

- `<title>`
- meta description
- canonical
- Open Graph
- Twitter / social metadata
- `hreflang`
- sitemap
- robots.txt
- RSS

### 24.1 Sitemap

应包括：

- 首页
- Blog
- Article
- Category
- Tag
- Archive
- About

Draft 不得进入 Sitemap。

多语言 URL 必须正确处理语言版本关联。

### 24.2 RSS

建议至少生成：

```text
/[locale]/rss.xml
```

每个语言版本可以拥有独立 RSS Feed。

例如：

```text
/zh-cn/rss.xml
/en/rss.xml
/fr/rss.xml
/de/rss.xml
/ja/rss.xml
```

正式发布的文章进入对应语言 Feed。

---

## 25. 多语言 SEO 细节

必须避免以下问题：

- 不同语言页面使用相同 canonical
- hreflang 指向不存在的页面
- 将不存在的翻译版本加入 sitemap
- 翻译页面被错误标记为重复内容
- Draft 出现在搜索引擎数据中

每一个实际存在的语言版本都应作为独立、可索引页面处理。

---

## 26. Accessibility

至少满足：

- Semantic HTML
- Heading hierarchy
- Alt text
- Keyboard navigation
- Focus state
- 足够的文字对比度
- 清晰链接语义
- 正确语言属性，例如 `<html lang="zh-CN">`
- RTL 结构预留（当前语言均不要求 RTL，但实现上不要阻碍未来增加）

---

## 27. Performance

核心目标是静态页面性能优先。

建议目标：

```text
Lighthouse Performance >= 90
Lighthouse Accessibility >= 90
Lighthouse Best Practices >= 90
Lighthouse SEO >= 90
```

重点：

- Static Generation
- 图片优化
- Responsive Image
- Lazy Loading
- 最少 JavaScript
- 最少第三方脚本
- 不阻塞首屏

---

## 28. 动效

允许：

- hover transition
- 链接过渡
- TOC 状态
- 少量滚动动画

不使用：

- 3D
- WebGL
- 大规模 parallax
- 阻塞式 loading animation
- 高频复杂滚动效果

原则：

> 动效服务于内容，而不是成为内容。

---

## 29. 站内搜索

第一阶段明确不实现站内搜索。

不引入：

- Algolia
- Meilisearch
- Elasticsearch
- 数据库型搜索服务

---

## 30. 评论 / 用户 / CMS

第一阶段明确不实现：

- 评论
- Giscus
- Utterances
- 登录
- 用户系统
- CMS
- 后台管理
- 可视化编辑器
- 数据库

---

## 31. Analytics

第一阶段默认不加入 Analytics。

原因：

- 降低第三方依赖
- 减少首屏脚本
- 降低隐私复杂度
- 降低维护成本

后续可独立评估。

---

## 32. 内容迁移与长期可维护性

文章应尽量保持与前端框架解耦。

最核心的数据层应该是：

```text
Markdown / MDX
+
Frontmatter
+
Local Assets
+
Translation Metadata
+
External Publish Links
```

未来即使从 Astro 迁移到 Next.js，文章内容与资源仍应可以复用。

---

## 33. 项目配置中心

站点级配置不应散落在组件中。

建议集中维护：

```text
Site Name
Site Description
Site URL
Author
Default Locale
Supported Locales
Navigation
Social Links
Default OG Image
Categories
```

例如：

```ts
siteConfig = {
  defaultLocale: "zh-CN",
  locales: ["zh-CN", "en", "fr", "de", "ja"],
}
```

---

## 34. 部署

必须支持静态部署到：

- Vercel
- Cloudflare Pages
- GitHub Pages

发布流程：

```text
Edit Content
   ↓
Git Commit
   ↓
Git Push
   ↓
Build
   ↓
Static Deployment
```

无需服务器运维。

---

## 35. Git 内容工作流

作者新增文章的理想体验：

```text
创建文章目录
        ↓
放入 index.md / index.mdx
        ↓
放入 cover.jpg / 正文图片
        ↓
填写 Frontmatter
        ↓
本地预览
        ↓
Git Commit
        ↓
Git Push
```

多语言文章只是在内容层新增对应语言版本，不应该引入复杂后台流程。

---

## 36. 文章资源完整性

构建系统应在 Build 阶段验证：

- Frontmatter Schema
- locale 是否合法
- translationId 是否存在且格式正确
- slug 是否冲突
- 语言 + slug 是否冲突
- Category 是否存在
- Tag 是否有效
- Cover 是否存在
- 正文引用的本地图片是否存在
- 内部链接是否有效（尽可能静态检查）
- Draft 是否被公开索引
- 翻译关系是否存在冲突

发现错误应尽量让 Build 失败，并给出明确错误位置。

---

## 37. 推荐文章文件结构

推荐优先采用以下逻辑结构之一，并在技术选型阶段最终确定：

### 结构一：语言独立文章目录

```text
content/
├── zh-CN/
│   └── blog/
│       └── 2026/
│           └── article-name/
│               ├── index.mdx
│               ├── cover.jpg
│               └── image-01.jpg
│
├── en/
│   └── blog/
│       └── 2026/
│           └── article-name/
│               ├── index.mdx
│               ├── cover.jpg
│               └── image-01.jpg
│
├── fr/
├── de/
└── ja/
```

优势：不同语言互不干扰，适合图片和独立发布时间。

### 结构二：翻译聚合目录

```text
content/
└── blog/
    └── 2026/
        └── article-name/
            ├── zh-CN.mdx
            ├── en.mdx
            ├── fr.mdx
            ├── de.mdx
            ├── ja.mdx
            ├── cover.jpg
            └── image-01.jpg
```

优势：一个逻辑文章的五语言版本集中管理。

### 选型原则

最终方案必须优先满足：

1. 翻译关系清晰
2. Git diff 清晰
3. 图片路径自然
4. 文章迁移方便
5. 静态构建简单
6. 新增语言不会重构现有内容

---

## 38. 不同语言版本的封面与媒体

默认允许语言版本共享资源：

```text
zh-CN → cover.jpg
en   → cover.jpg
```

也允许独立资源：

```text
zh-CN → cover-zh.jpg
en    → cover-en.jpg
```

正文图片同样允许共享或独立。

原因是翻译版本可能存在不同文化语境、图片文字或版权要求。

---

## 39. 外部发布与语言关联示例

例如同一逻辑文章：

```text
translationId = "my-thoughts-on-ai"
```

中文版本：

```text
/zh-cn/blog/ai-thoughts
```

发布到：

```text
知乎
小红书
```

英文版本：

```text
/en/blog/thoughts-on-ai
```

发布到：

```text
X
LinkedIn
Medium
```

它们属于同一逻辑文章，但拥有不同的语言、URL、外部平台和可能不同的内容。

---

## 40. 第一阶段 MVP 页面

必须实现：

```text
/
/[locale]/
/[locale]/blog
/[locale]/blog/[slug]
/[locale]/category/[category]
/[locale]/tags
/[locale]/tag/[tag]
/[locale]/archive
/[locale]/about
/[locale]/rss.xml
```

其中最重要的三个页面：

1. 首页
2. 文章页
3. Archive

---

## 41. 第一阶段 MVP 功能

### 内容

- [ ] Markdown
- [ ] MDX
- [ ] React Components
- [ ] Frontmatter Schema
- [ ] Draft
- [ ] Featured
- [ ] Category
- [ ] Tags
- [ ] 五语言内容
- [ ] Translation Relationship

### 图片

- [ ] Cover
- [ ] 正文图片
- [ ] Alt
- [ ] Caption
- [ ] 响应式图片
- [ ] 图片优化
- [ ] Lazy Loading
- [ ] 本地图片资源
- [ ] 构建时图片完整性检查

### 阅读

- [ ] TOC
- [ ] Anchor
- [ ] Reading Time
- [ ] Code Highlight
- [ ] Related Articles
- [ ] Previous / Next
- [ ] Language Switcher

### 社交

- [ ] Open Graph
- [ ] Social Preview
- [ ] External Publish Links
- [ ] Canonical URL
- [ ] 每语言独立外链记录

### SEO

- [ ] Title
- [ ] Description
- [ ] Canonical
- [ ] Open Graph
- [ ] hreflang
- [ ] Sitemap
- [ ] Robots
- [ ] 五语言 RSS

### 部署

- [ ] Vercel
- [ ] Cloudflare Pages
- [ ] GitHub Pages

---

## 42. 明确不在第一阶段实现

- 评论系统
- Giscus
- Utterances
- 用户登录
- 用户系统
- CMS
- 后台管理
- 可视化编辑器
- 数据库
- Newsletter
- 站内搜索
- 暗色模式（非核心需求）
- 3D
- WebGL
- 复杂页面动画
- AI 推荐系统
- 自动发布社交平台
- 自动同步第三方全文
- 自动抓取社交平台内容

---

## 43. 设计与页面验收原则

### 首页

必须具有明显的编辑感，而不是单纯文章卡片瀑布流。

### 文章页

必须体现“阅读作品”的感觉，而不是简单 Markdown Renderer。

### Archive

需要体现长期内容积累感。

### 图片

图片应当参与叙事与版式，而不是全部缩成统一 thumbnail。

### Typography

标题、正文、Caption、Metadata 之间应具有清晰层级。

### Mobile

移动端不是 Desktop 的缩小版，需要单独考虑排版和导航。

---

## 44. 核心设计关键词

```text
Editorial
Magazine
Minimal
Image-led
Typography-led
Content-first
Static
Low Maintenance
Multilingual
Long-term Archive
```

避免呈现为：

```text
Developer Dashboard
SaaS Landing Page
Portfolio
Medium Clone
普通技术博客模板
```

---

## 45. 最终用户体验目标

### 作者侧

理想体验：

> 创建一个文章目录 → 写 Markdown / MDX → 放入图片 → 填写元数据 → 本地预览 → Git Push → 自动发布。

创建翻译版本时：

> 在同一个 translationId 下增加目标语言版本 → 本地预览 → Git Push。

不需要 CMS，不需要数据库，不需要后台操作。

### 读者侧

读者应感受到：

> 这是一个有人认真编辑过的个人出版物。

而不是：

> 这是一个把 Markdown 渲染成 HTML 的博客。

---

## 46. 项目最终定位

本项目最终定义为：

> **一个以 Markdown / MDX 为内容源，以图片、排版和编辑结构为视觉核心，以 Git 为出版流程，原生支持中文简体、英文、法文、德文和日文的个人数字出版物。**
