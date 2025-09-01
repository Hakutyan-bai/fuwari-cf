---
title: Gemini-API中转
published: 2025-09-01
description: '中转Gemini的api让大陆地区可以使用'
image: ''
tags: [API中转]
category: '项目分享'
draft: false
lang: ''
updated: 2025-09-01 10:00:00
---

今天介绍的项目是 **Gemini API 负载均衡器 (gemini-balance-do)** ，一个部署在Cloudflare的代理服务

::github{repo="zaunist/gemini-balance-do"}

## 特点

- 将多个Gemini API聚合到一个端点中。

- 通过随机轮询密钥池来实现请求的负载均衡。

- 提供与OpenAI API兼容的接口，使现有工具可以轻松集成。

## 主要功能

- **Gemini API 代理**：作为 Google Gemini API 的稳定代理。
- **负载均衡**：在配置的多个API共享之间随机分配请求。
- **OpenAI API 格式兼容**：支持等常用 OpenAI 端点`/v1/chat/completions`。`/v1/embeddings``/v1/models`
- **流式响应**：完全支持Gemini API的流式响应。
- **API接口管理**：
  - 提供一个简单的 Web UI，用于批量添加和查看 API 密钥。
  - 提供API接口用于检查并自动清理故障的交换机。
- **持久化存储**：使用 Cloudflare Durable Objects 内部的 SQLite 安全地存储 API 密钥。

## 通过Cloudflare Dashboard部署

1. **Fork 项目**：点击本仓库右上角的“Fork”按钮，另外项目复刻到你自己的 GitHub 账户。

2. **登录 Cloudflare**：打开[Cloudflare Dashboard](https://dash.cloudflare.com/)。

3. **创建Worker**：
   
   - 在左侧导航终点，进入`Workers & Pages`。
   - 点击`创建应用程序`-> `连接到 Git`。
   - 选择你刚刚Fork的仓库。
   - 在“构建和部署”设置中，Cloudflare通常会自动检测到这是一个 Worker 项目，需要额外配置。
   - 点击`保存并部署`。

## API密钥管理

配置完成后，你可以通过访问你的Worker URL来管理Gemini API SSH。

:::note

workers.dev这个域名是被墙的，你需要将域名托管到Cloudflare，然后在worker绑定自定义域名

:::

- **访问管理面板**：在浏览器中打开你的Worker URL（例如`https://gemini-balance-do.your-worker.workers.dev`），首次访问会显示登录框，需要输入你的HOME_ACCESS_KEY进行认证，通过认证后才能进入管理页面。
- **批量添加按键**：在文本框输入你的Gemini API按键，每行一个，然后点击“添加按键”。
- **查看和刷新**：在右侧面板可以查看已存储的按键，并可以点击“刷新”按钮更新列表。
- **一键检查**： 点击“一键检查”按钮，可以检查API key可用性。
- **批量删除**：选中无效的API key，可以一键删除所有无效的API key。

**修改管理面板访问密钥`7b18e536c27ab304266db3220b8e000db8fbbe35d6e1fde729a1a1d47303858d`，用于访问管理面板和管理 API 时的身份验证，强烈建议您在 Cloudflare Worker 环境变量中修改`HOME_ACCESS_KEY`值，完成后重新配置即可。**

<img title="" src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANQaLUNDGvDyDVUaJU1Uuj2vbF1QrYAAlrIMRvTaahV0ChYjQLUm-QBAAMCAAN3AAM2BA.png" alt="">
---

文章编辑：`@鈴奈咲桜`