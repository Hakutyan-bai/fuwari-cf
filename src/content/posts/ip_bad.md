---
title: 不能正常获取IP地址怎么办？
published: 2026-01-20
description: "先重启所有设备，说不定你就不用点开这篇文章了"
image: ""
tags: [IP, 路由]
category: "分享"
draft: false
lang: ""
updated: 2026-01-20 14:30:00
---

你重启了吗？

# 我遇到的问题

今天发现以太网死活获取不到正确的 IP 地址，如图
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAPdaW8qwuz6rs4v9xcOhb3wwswcPLEAAuQNaxsTqHhXM3Ie0Uy3_JABAAMCAAN3AAM4BA.png">
于是呢我就手动设置了一遍 IP 地址，还是不行，又尝试了网上的各种办法，自然是没什么用的,最后靠重启路由器修好了（重启大法真好用吧）

其实我是想不到是路由器的原因的，我检查了网线接口，没坏，然后打开任务管理器才发现原来是获取不到 IP 才导致上不了网

# 除了重启之外别的解决方法

1. 试一下手动设置 IP
1. 关掉代理软件
1. 检查 DHCP 地址池是否分配充足
1. 重启 DHCP （这不还是重启吗）
1. 重新获取 IP 地址

首先释放原 IP

```cmd
ipconfig/release

```

重新获取新的 IP

```cmd
ipconfig/renew
```
