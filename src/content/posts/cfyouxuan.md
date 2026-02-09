---
title: CloudFlare Workers 优选
published: 2026-02-09
description: 'CF优选教程，支持Pages和Workers'
image: ''
tags: [CloudFlare,优选]
category: 'CloudFlare'
draft: false 
lang: ''
updated: 2026-02-09 19:30:00
---

### 不多比比直接开始
如果你使用Pages，可以在项目根目录新建一个文件wrangler.jsonc然后部署到Workers。PS：Workers几乎支持Pages的所有功能，且优选很简单
```
{
  "name": "your-worker-name",//部署到Workers的项目名称
  "compatibility_date": "2026-02-09",
  "assets": {
    "directory": "./dist"//输出目录
  }
}

```
好的你的项目从Pages迁移到了Workers
### 现在才是真正的开始
1. 进入你要优选的Workers设置，新建**路由**,值为你的访问域名后面加个/*
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAPeaYnSGIQcOlolt4eJyfEnxDxSEm0AAj0Paxv1XFFU8J12-1jwo5EBAAMCAAN5AAM6BA.png">

2. 找一个优选IP/域名，这里推荐[NB 优选服务](https://www.byoip.top/)，也是很NB啊，cf vercel netlify eo啥都有，速度也挺快


3. 添加CNAME记录，目标填写优选IP/域名，**代理状态要关闭**
:::note
如果你不知道
`*.cf.cnae.top（例）`
是泛解析的意思，要么去掉*，要么改掉*，不能用*
:::
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAPfaYnSKpaRlGHWzAAB_MM-HIyOreggAAI-D2sb9VxRVIqUV1oXxPF1AQADAgADeQADOgQ.png">

前后对比我就不放图片了，去itdog测试你会发现cf不再是减速器

---

文章编辑：`@鈴奈咲桜`