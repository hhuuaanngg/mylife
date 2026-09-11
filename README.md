# 此刻

年轻向的生活轻博客：照片为主，文案一两句。首页瀑布流直接刷完，没有详情页。

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
tags: [夜走, 城市]
photos:
  - /photos/night-01.jpg
---
路灯把地面分成一块一块的，风有点甜。
```

文案超过四行会出现「更多」，点开后在当前卡片里展开。

照片支持两种看发：顶栏切换 **九宫格** / **大图**。点图片会开灯箱，只能翻当前这条里的照片。
