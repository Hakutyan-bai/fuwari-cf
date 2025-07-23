---
title: Telegraph-Image
categories:
  - 图床
tags:
  - 教程
---
# Telegraph-Image：免费、快速、优雅的图床方案

在日常写作、开发文档或博客发布中，优雅又可靠的图床服务无疑是创作者们的刚需。今天要为大家推荐一个优秀的开源项目：[Telegraph-Image](https://github.com/cf-pages/Telegraph-Image)。

这个项目基于 [telegra.ph](https://telegra.ph/) 的图像上传服务，结合 Cloudflare Pages 实现了无需服务器、免费托管、部署便捷的图床方案。简单、高效、开箱即用！

---

## ✨ 项目亮点

- **零后端，纯前端部署**：项目基于 HTML + JS，完美适配 [Cloudflare Pages](https://pages.cloudflare.com/)
- **匿名上传，免注册**：图片直接上传至 telegra.ph，无需登录，无需 API Key
- **高颜值 UI**：简洁、现代的界面，体验丝滑
- **支持拖拽上传、粘贴上传、多图上传**
- **支持一键复制 Markdown / HTML 格式的图片地址**

---

## 🚀 在线体验

你可以通过作者提供的示例站点直接体验该图床的功能：

👉 [https://telegraph-image.pages.dev/](https://telegraph-image.pages.dev/)

---

## 🛠️ 快速部署到你的 Cloudflare Pages

只需几步就能拥有属于自己的 Telegraph 图床站点：

### 1. Fork 本仓库

点击 GitHub 页面右上角的 `Fork` 按钮，将项目复制到你自己的账户下。

### 2. 登录 Cloudflare Pages

进入 [Cloudflare Pages](https://pages.cloudflare.com/)，点击 **Create a project**

### 3. 连接你的 GitHub 仓库

选择你 fork 的 `Telegraph-Image` 仓库。

### 4. 设置构建配置

构建设置如下：

- **Framework preset**: `None`
- **Build command**: _空_
- **Build output directory**: `dist`

然后点击部署即可！

---

## 📷 使用方式

上传图片后，你将得到类似这样的地址：

```
https://telegra.ph/file/xxxxxxxxxxx.jpg
```

你可以一键复制为 Markdown 或 HTML 格式，用于博客、论坛、文档等各种场景。

---

## 🙌 项目推荐理由

作为一个轻量、现代、零成本的图床解决方案，`Telegraph-Image` 非常适合：

- 不想自己搭建图床服务的博客作者
- 需要快速临时图像托管的用户
- 前端项目嵌入图片链接的需求场景

简单、优雅、好用。

---

## 📚 项目地址

- GitHub 项目主页：[https://github.com/cf-pages/Telegraph-Image](https://github.com/cf-pages/Telegraph-Image)
- 作者主页：[https://github.com/cf-pages](https://github.com/cf-pages)

如果你也觉得这个项目不错，别忘了给作者一个 ⭐️ Star 哦！

---

