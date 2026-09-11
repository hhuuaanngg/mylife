# MEMORE COOL

从 [memore.cool](https://memore.cool) 迁过来的个人轻博客。首页是瀑布流卡片，每篇一个卡片；图片用九宫格组合预览，点进详情看全部。

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

首页每页 12 篇。卡片上最多露出 9 张图，超过会显示 +N；点图片进入详情页。
