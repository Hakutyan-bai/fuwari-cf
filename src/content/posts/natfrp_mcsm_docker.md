---
title: Docker 中 MCSM 开的服映射失败？点我看看！
published: 2025-09-06
description: '本文讲述如何解决Docker 中 MCSM 开的服映射失败'
image: ''
tags: [内网穿透,Docker,服务器]
category: '内网穿透'
draft: false 
lang: ''
updated: 2025-09-06 19:30:00
---
# 事情起因
OK又水一篇（  用Docker安装了MCSM，并且开了个服务器，用FRP映射不出去，一直显示

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANXaLwuPmeu1BoUw_GVP0pjlEj99f4AAhjaMRvWcuBViG9AwGUimH4BAAMCAAN3AAM2BA.png">

我想我的FRP也没搞错啊，端口25565，IP是localhost

# 解决方法
原来是要填写Docker中MCSM后端服务的IP，比如我这里的172.18.0.3
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANYaLwwn-Qh3XkXKDT3CfubzPsbN9kAAhzaMRvWcuBVcWVgyKJXzR8BAAMCAAN3AAM2BA.png">

最后问题也是成功解决！

---

文章编辑：`@鈴奈咲桜`