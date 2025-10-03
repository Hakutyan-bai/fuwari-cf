---
title: 企业微信绑定二级邮箱，以及dyn6的坑
published: 2025-10-03
description: ''
image: ''
tags: [杂谈]
category: '分享'
draft: false 
lang: ''
series: 分享
updated: 2025-10-03 14:00:00
---
**大家国庆快乐**

事情的起因是十月一号，我想添加二级邮箱域名到企业微信（，先给大家说一下如何创建自己的二级域名吧

# 创建二级域名
不知道大家有没有听说过 [**dyn6**](https://dynv6.com/) （好啦现在听说了）打开这个网站，

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANzaN9yAAHC1gJuZKK57prp7fyzmYd2AAISDGsbr374VmxdqWet3CmAAQADAgADdwADNgQ.png">
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANyaN9yAAEK0mYEYZSgHvI3zrZP_US0AAIRDGsbr374VokNwelh5w5IAQADAgADdwADNgQ.png">
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAN0aN9yAAHnfUPSmkCo243z9XagqkVdAAITDGsbr374VgELLsM3Q45uAQADAgADdwADNgQ.png">
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAN1aN9yAwoxKomXDc6b2wAB4D8l-LAuAAIUDGsbr374ViYSbCBFUzQZAQADAgADdwADNgQ.png">
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAN2aN9yA6WHZjGAAW5GMju1_zxZCocAAhUMaxuvfvhWb_AxTOnYpVoBAAMCAAN3AAM2BA.png">
okok 到这里，你已经创建了一个二级域名，接下来我想说一些比较坑的地方

# 遇到的比较坑的地方
这是[yCENzh写的原文章](https://fuwari.oh1.top/posts/essay/wxmx-d6/)欢迎阅读
`yCENzh`：今天10-01终于让我找到水文章的机会了,还得是奈奈（

新整了个二级域名 **work.sakura.ink** 专门拿来绑企业微信邮箱的
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_1.BPQ0hBLm_Z29hmpa.webp">
我等啊等啊，一个小时过去了？欸我靠怎么还没解析完
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_2.CfJQthgS_Z1Air6i.webp">
我想我好像也没解析错啊
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_3.BhaieqIC_2q4uKR.webp">
看到这里是不是不太对
```
Name: work.sakura.ink
Type: MX
Value: mxbiz1.qq.com.work.sakura.ink
```
这实际上相当于
```
work.sakura.ink → mxbiz1.qq.com.work.sakura.ink
```
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_4.DM26X1cn_Z1Ut1ys.webp">
mxbiz1.qq.com后面并没有.,这直接导致了mxbiz1.qq.com这个值被当成了子域拼接
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_5.6dE-lC_W_ZoJ4lM.webp">
可以看到在值末尾添加上.之后就变成了mxbiz1.qq.com.而非mxbiz1.qq.com.work.sakura.ink
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_6.B4iAVYMI_Z2o73P.webp">
最后等一分钟不到就通过了
<img src="https://fuwari.oh1.top/_astro/wxmx-d6_7.UK4OWOje_C5qjh.webp">

---

文章编辑：`@鈴奈咲桜`
