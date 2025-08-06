---
title: XUGOU-基于CloudFlare的轻量化监控平台
published: 2025-08-04
description: ''
image: ''
tags: [网站监控,客户端监控,CloudFlare]
category: '监控'
draft: false 
lang: ''
updated: 2025-08-05 20:00:00
---
# XUGOU
作者:阿杰鲁
XUGOU 是一个基于 CloudFlare 的轻量化系统监控平台，提供系统监控和状态页面功能。



---


## 🖼️ 项目界面预览


作者提供了在线演示地址

https://xugou.mdzz.uk/

---



## 支持功能

- 系统监控 - 客户端资源监控与数据上报
- HTTP 监控 - API 接口健康检测
- 数据可视化 - 实时数据展示与历史趋势
- 状态页面 - 可定制的服务状态页面
- 告警通知 - 异常事件通过多渠道通知（电子邮件、Telegram等）

### 🖥️系统监控

- 实时监控 CPU、内存、磁盘、网络等系统指标
- 支持自定义监控间隔
- 全平台支持（agent由go编写，理论上go能编译的平台都可以支持）

### 🌐 HTTP 监控

- 支持 HTTP/HTTPS 接口监控
- 自定义请求方法、头部和请求体
- 响应时间、状态码和内容检查

### 📊 数据可视化

- 实时数据图表展示
- 自定义仪表盘

### 🌍 状态页面

- 自定义状态页面
- 支持多监控项展示
- 响应式设计



---

# 原作者部署指南
该项目可以部署到赛博活佛CloudFlare，原作者提供了部署文档和视频教程

## 部署文档

https://github.com/zaunist/xugou/wiki

## 视频教程

原作者本来有在B站发视频的，但是不知道什么原因下架了，所以这里提供YouTube视频

<iframe width="100%" height="468" src="https://www.youtube.com/embed/w2by-7jDCM0?si=N1WTorLKL0uwLsU_" title="YouTube video player" frameborder="0" allowfullscreen></iframe>

---

## 📚 项目地址

::github{repo="eoao/zaunist/xugou"}

如果你也喜欢 XUGOU，别忘了给它一个 ⭐️ Star！

---



文章编辑：`@鈴奈咲桜`