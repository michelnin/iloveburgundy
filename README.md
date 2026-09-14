# 爱勃艮第 · I Love Burgundy

面向中文读者的勃艮第葡萄酒指南。基于 [Astro](https://astro.build) 构建，输出纯静态 HTML，专为搜索引擎与 AI 大模型抓取（GEO）优化。

- 线上地址：https://iloveburgundy.cn
- 技术栈：Astro（`output: 'static'`，零客户端 JS）+ Content Collections + Markdown

## 本地预览

```sh
npm install
npm run dev
```

打开 http://localhost:4321 即可预览。修改文件后页面会自动刷新。

正式发布前，建议先跑一次生产构建，确认没有报错：

```sh
npm run build
npm run preview
```

## 目录结构

```
src/
├── content/
│   ├── notes/       # 文章
│   ├── glossary/    # 术语库词条
│   ├── rankings/    # 榜单与观点文章
│   ├── trips/       # 旅行
│   └── courses/     # 课程
├── content.config.ts  # 内容字段规范（frontmatter schema）
├── layouts/          # 页面外壳（BaseLayout 等）
├── components/       # 可复用组件
├── i18n/             # 中/英/法文案字典
└── pages/            # 路由页面
```

## 怎么加一篇新文章

在 `src/content/notes/` 目录下新建一个 `.md` 文件（文件名会成为 URL 的一部分，建议用英文短横线命名，例如 `my-new-post.md`），文件开头写 frontmatter：

```markdown
---
title: 文章标题
description: 一句话摘要，会出现在列表页和搜索结果里
date: 2026-03-01
tags:
  - 标签1
  - 标签2
lang: zh
draft: false
---

正文内容，支持标准 Markdown 语法。
```

保存后，本地跑 `npm run dev` 就能在 `/notes/` 列表和 `/notes/my-new-post/` 详情页看到这篇文章。

### Frontmatter 字段说明

| 字段 | 是否必填 | 说明 |
|---|---|---|
| `title` | 必填 | 标题 |
| `description` | 选填 | 摘要，用于列表页、SEO、OG 分享卡片 |
| `date` | 必填 | 发布日期，格式 `2026-03-01` |
| `updated` | 选填 | 更新日期 |
| `tags` | 选填 | 标签数组 |
| `lang` | 选填，默认 `zh` | `zh` / `en` / `fr` |
| `draft` | 选填，默认 `false` | 设为 `true` 则不会出现在网站上，但本地仍可预览 |
| `cover` | 选填 | 封面图路径，会自动优化为 WebP 和多种尺寸 |
| `slug` | 选填 | 自定义 URL 片段，不填则用文件名 |

`glossary`（术语库）、`rankings`（榜单）、`trips`（旅行）、`courses`（课程）四个目录用的是完全相同的字段规范，写法一致。

**重要**：schema 允许除以上字段外的任意额外字段（用于兼容 Obsidian 的 Enveloppe 插件推送时自动带上的 `share` 等字段），不会因为多余字段导致构建失败。

## 关于 Obsidian + Enveloppe

如果你用 Obsidian 的 Enveloppe 插件把笔记同步到 `src/content/notes/`，可以直接推送，不需要额外配置——插件带来的多余 frontmatter 字段会被自动忽略，不影响构建。同步后记得在本地跑一次 `npm run build` 确认没有报错，再推送到 GitHub。

## 术语库（Glossary）怎么加词条

在 `src/content/glossary/` 下新建 `.md` 文件，字段规范和文章完全一样，`title` 就是术语名，正文是解释。保存后会出现在 `/glossary/` 列表和 `/glossary/文件名/` 独立页面，并自动生成 `DefinedTerm` 结构化数据。

## GEO（给 AI 抓取优化）已经做了什么

- 每篇文章、每条术语都是服务端渲染的纯 HTML 正文，不依赖 JS 渲染
- 全站输出 JSON-LD 结构化数据：`Person`（作者身份，出现在每一页）、`Article`（文章/榜单/旅行/课程详情页）、`DefinedTerm`（术语库词条）、`FAQPage`（关于页的常见问题）
- 自动生成 `/sitemap-index.xml`
- 自动生成 `/llms.txt`（内容索引）和 `/llms-full.txt`（全文合集），供 AI 模型直接抓取
- `/robots.txt` 明确允许 GPTBot、ClaudeBot、anthropic-ai、Google-Extended、PerplexityBot、Bytespider、Baiduspider、YisouSpider 等爬虫
- 每页都有 canonical 标签、完整的 Open Graph / Twitter 卡片信息

发布新内容后，这些文件会在下次构建时自动更新，不需要手动维护。

## 部署到 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **创建应用程序** → **Pages** → **连接到 Git**
2. 选择 GitHub 账号下的 `michelnin/iloveburgundy` 仓库
3. 构建配置：
   - **框架预设**：Astro
   - **构建命令**：`npm run build`
   - **构建输出目录**：`dist`
   - **Node 版本**：22（如需手动指定，在环境变量里加 `NODE_VERSION=22`）
4. 部署完成后，Cloudflare 会给一个 `*.pages.dev` 的临时域名，可以先用它验证网站是否正常
5. 绑定自定义域名 `iloveburgundy.cn`：进入该 Pages 项目 → **自定义域** → 添加 `iloveburgundy.cn`，按提示完成 DNS 解析（如果域名已经托管在 Cloudflare，会自动配置；如果不是，需要先把域名的 DNS 服务器改成 Cloudflare 提供的两个地址）

之后每次 `git push` 到 `main` 分支，Cloudflare 都会自动重新构建并发布，不需要手动操作。

## 常用命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 本地开发服务器（含热更新） |
| `npm run build` | 生产构建，产物在 `dist/` |
| `npm run preview` | 本地预览生产构建结果 |
| `npm run astro check` | 类型检查，提前发现内容或代码问题 |
