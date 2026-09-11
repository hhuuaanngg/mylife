---
title: "AI Answer to Markdown"
date: 2026-05-23
tags:
  - "技术"
photos:
  - "/photos/answer2markdown/01-AI-Answer-to-Markdown.png"
  - "/photos/answer2markdown/02-icon_144px.png"
  - "/photos/answer2markdown/03-TUAREY8WOhDaawV7fyvdBUY55Hn9LBQBaeiW7U61rI1LBXXaG4dVIFm5tyP8.jpg"
---

# AI Answer to Markdown 使用支持

AI Answer to Markdown 是一个本地优先的 Chrome 扩展，用于把当前 ChatGPT 或 Gemini 对话中的 AI 回答保存为本地 Markdown 文件。它适合把有价值的 AI 回答、代码片段、表格、列表和链接整理到 Obsidian、个人笔记库或文档项目中。

当前版本：`0.3.0`

下载地址：

[AI Answer to Markdown - Chrome 应用商店Save ChatGPT and Gemini answers as local Markdown files with code blocks and rich formatting preserved.Chrome 应用商店](<https://chromewebstore.google.com/detail/ai-answer-to-markdown/ohbnbnnffckhmlmpbacbadjddegejhik?authuser=0&hl=zh-CN&ref=memore.cool>)

## 支持的网站

扩展目前支持以下页面：

  * `https://chatgpt.com/*`
  * `https://chat.openai.com/*`
  * `https://gemini.google.com/*`

如果你在其他 AI 网站上打开扩展，可能会看到“请先打开 ChatGPT 或 Gemini 对话”的提示。这是预期行为。

## 主要功能

  * 将 ChatGPT 和 Gemini 当前对话导出为 `.md` 文件
  * 保留常见 Markdown 结构，包括标题、段落、列表、引用、表格、链接、行内代码和代码块
  * 可选择是否包含用户提问
  * 可选择是否包含 YAML frontmatter
  * 可保存到用户主动授权的本地文件夹
  * 自动避免覆盖已有文件
  * 不上传对话内容，不调用外部服务器处理文本

## 使用方法

  1. 打开一个 ChatGPT 或 Gemini 对话页面。
  2. 点击 Chrome 工具栏中的 AI Answer to Markdown 扩展图标。
  3. 如果还没有选择保存目录，点击 `Choose Folder`。
  4. 选择一个本地文件夹，例如 Obsidian vault 中的某个目录。
  5. 按需勾选 `Include user prompts` 和 `Include frontmatter`。
  6. 点击 `Save Markdown`。
  7. 扩展会在你选择的文件夹中生成一个 `.md` 文件。

## 导出的 Markdown 示例
    
    
    ---
    source: ChatGPT
    url: https://chatgpt.com/c/example
    created: 2026-05-23T00:00:00.000Z
    ---
    
    # Conversation title
    
    ## User
    
    用户提问内容
    
    ## Assistant
    
    AI 回答内容
    
    ```js
    console.log("code block");
    ```
    

## 常见问题

### 为什么必须选择文件夹？

扩展使用浏览器提供的 File System Access API。只有当你主动点击 `Choose Folder` 并授权后，扩展才可以把 Markdown 文件写入该目录。

扩展不会静默扫描你的磁盘，也不会访问你没有授权的其他文件夹。

### 为什么保存时又请求了一次权限？

Chrome 可能会在浏览器重启、系统权限变化或目录句柄权限过期后重新请求写入权限。你只需要在浏览器提示中重新允许该目录即可。

### 为什么有些内容没有被完整保留？

ChatGPT 和 Gemini 的页面结构可能会更新。扩展会尽量保留常见 Markdown 结构，但以下内容可能无法完全转换：

  * 动态组件
  * 复杂交互式内容
  * 部分网页内嵌媒体
  * 由平台特殊渲染的公式或富文本

如果你发现某类内容经常无法导出，可以反馈具体页面和内容类型。

### 为什么图片没有保存到本地？

当前版本会尽量保留图片引用地址，但不会把远程图片下载到本地目录。后续版本可能会增加本地图片保存功能。

### 会不会覆盖已有文件？

不会。遇到同名文件时，扩展会自动生成新的文件名，避免覆盖已有 Markdown 文件。

### 是否支持批量导出？

当前版本只导出当前打开的对话页面。批量导出多个对话暂未支持。

## 故障排查

### 扩展提示“Open a ChatGPT or Gemini conversation first.”

请检查：

  * 当前标签页是否为 ChatGPT 或 Gemini 页面
  * URL 是否属于支持的网站范围
  * 页面是否已经加载完成
  * 当前页面中是否有 AI 回答内容

### 扩展提示“No ChatGPT/Gemini answer was found on this page.”

请尝试：

  * 等待对话完全加载后再导出
  * 刷新页面后重试
  * 确认当前页面不是空白对话、新建对话页或登录页
  * 确认页面中确实已有 AI 回答

### 点击保存后没有看到文件

请检查：

  * 是否选择了正确的保存文件夹
  * 浏览器是否弹出了权限请求
  * 系统是否允许 Chrome 写入该目录
  * 文件是否以平台名和日期命名，例如 `ChatGPT-title-2026-05-23-120000.md`

### 选择文件夹失败

请尝试：

  * 使用最新版 Chrome
  * 避免选择系统受保护目录
  * 重新点击 `Choose Folder`
  * 在扩展 Options 页面重新选择目录

## 权限说明

AI Answer to Markdown 使用以下权限：

  * `storage`：保存用户选项，例如是否默认包含用户提问和 YAML frontmatter。
  * `activeTab`：当用户点击扩展弹窗时，允许扩展从当前支持的标签页导出内容。
  * ChatGPT/Gemini 站点权限：仅用于读取当前支持页面中的可见对话内容，并转换为 Markdown。

扩展只在用户主动点击保存时执行导出。

## 隐私说明

AI Answer to Markdown 不会上传你的对话内容、设置、浏览数据或个人数据。

导出过程在浏览器本地完成。扩展不会调用外部服务器，不包含分析服务，也不使用云同步服务。

更多信息请查看隐私政策：

`PRIVACY.md`

发布到博客时，可以把这里替换为你的线上隐私政策链接。

## 反馈与支持

如果你遇到问题，建议在反馈中包含以下信息：

  * Chrome 版本
  * 扩展版本
  * 使用的网站：ChatGPT 或 Gemini
  * 出错时的页面 URL 类型，不需要提供完整私密链接
  * 具体错误提示
  * 你期望导出的内容类型，例如代码块、表格、列表或链接

请不要在公开反馈中粘贴包含隐私或敏感信息的完整对话内容。

如果你有 GitHub 仓库、博客评论区或邮箱支持渠道，可以在这里补充对应链接。

## English summary

AI Answer to Markdown is a local-first Chrome extension that saves visible ChatGPT and Gemini answers as local Markdown files. It preserves common Markdown structures such as headings, lists, tables, links, inline code, and fenced code blocks.

The extension processes content locally in the browser. It does not upload conversation content or send user data to external servers.

Supported pages:

  * `https://chatgpt.com/*`
  * `https://chat.openai.com/*`
  * `https://gemini.google.com/*`

Basic steps:

  1. Open a ChatGPT or Gemini conversation.
  2. Click the extension icon.
  3. Choose a local folder.
  4. Select export options.
  5. Click `Save Markdown`.

For support, include your Chrome version, extension version, supported site, error message, and the type of content you were trying to export. Do not share private conversation content in public feedback.
