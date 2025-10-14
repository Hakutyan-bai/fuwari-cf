---
title: "Fumomo 部署教程！！！"
description: "Fumomo是一款可爱的个人主页模板！使用Nuxt架构，本篇博客会将Fumomo托管到Vercel。"
published: 2025-08-26
updated: 2025-08-26 12:00:00
tags: [个人主页,教程]
category: "个人主页"
image: ""
series: Fumomo个人主页
featured: true
featuredRank: 11 #可选，数字越大排序越靠前
---
# 事先准备

1. 一个善于思考问题脑子，最好是多核心的那种，并且遇到问题会自己先思考

2. 一个[Github](https://github.com)账号

3. [Git - Downloads (git-scm.com)](https://git-scm.com/downloads)：提交代码用的

4. [Node.js — Run JavaScript Everywhere (nodejs.org)](https://nodejs.org/en)：Fumomo基于Node.js，你一定要安装这个

5. 一个[Vercel](https://vercel.com)账号：用于托管

6. 一个编辑器，比如VSCode


# 流程图

本地预览与修改 -> 推送更改到远程Github仓库 -> Vercel检测到仓库更新自动构建新的网站静态文件 -> 网站成功更改

# 本地部署教程
1. 下载源代码！

https://github.com/Hakutyan-bai/Fumomo-nuxt

2. 进入目录并且安装依赖
```
cd Fumomo-nuxt

#全局安装pnpm，装过的可以不装
npm install -g pnpm

#安装项目依赖
pnpm i
```
3. 启动项目
```
#启动项目dev环境
pnpm dev
```
4. 在浏览器输入控制台输出的网址即可预览

## 修改基本信息
在"fumomo-nuxt/app/config"有一个"index.ts"文件，这里控制着个人主页的基本信息,也写了较为详细的注释，更多内容请查看GitHub中的文档

---

文章编辑：`@鈴奈咲桜`