# MEMORE COOL

从 [memore.cool](https://memore.cool) 迁过来的个人轻博客：照片、生活和技术笔记都在首页瀑布流里刷完，没有详情页。

## 本地运行

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 发一条

在 `src/content/posts/` 新建 Markdown，图片放到 `public/photos/`：

```md
---
title: 下班路过的灯
date: 2026-09-10
tags: [照片]
photos:
  - /photos/my-post/01.jpg
---
路灯把地面分成一块一块的，风有点甜。
```

文案超过四行会出现「更多」，点开后在当前卡片里展开。顶栏可切换 **九宫格** / **大图**。
