---
title: Unity的AR
published: 2025-12-05
description: ''
image: ''
tags: [Unity]
category: '文档'
draft: false 
lang: ''
series: Unity开发
updated: 2025-12-05 20:30:00
---
本篇文章将告诉你如何使用EasyAR，通过Unity实现AR效果，在开始前请先准备：
1. 聪明的大脑
2. 注册一个[EasyAR](easyar.cn)的账号
3. 下载[EasyAR Sense Unity Plugin](https://www.easyar.cn/view/download.html)
3. Unity编辑器

# 创建Sense许可证密钥
来到EasyAR的开发中心，创建一个密钥
1. 选择EasyAR Sense 4.x 个人版
2. 是否使用稀疏空间地图：否
3. 应用名称需要注意的是Package Name，要填写xxx.xxx.xxx
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPSaTLfvMphX3lKK78bzJ66YXkUxkUAAuALaxurIZhVusip9K7Y98QBAAMCAAN3AAM2BA.png"><img>
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPUaTLgvr0eYxp7E5PlRy7XpB9SAAF5AALhC2sbqyGYVd1zE_edH5FlAQADAgADdwADNgQ.png"><img>

# 导入插件包并配置密钥
## 导入插件包
1. 解压插件包（只需要里面的package文件夹）
2. 打开Unity编辑器，在上方的Windows>Packge Manager并打开
3. 点击左上角的加号选择从磁盘打开，选择package文件夹中的packge.json文件打开，片刻后Unity上方会出现EasyAR菜单，表示插件导入完成
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPVaTLhTZrJVC415IAcrse0XlmQhBUAAuILaxurIZhVd4Xx6uTre7UBAAMCAAN3AAM2BA.png"><img>

## 配置密钥
我们刚刚创建了Sense许可证密钥，现在需要配置
1. 点击刚刚创建的密钥后面的查看
2. 复制密钥
3. 在Unity中打开刚刚出现的EasyAR菜单，选择Configuration，在License Key中填写刚刚创建的密钥
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPWaTLhk8gsufYdck4qfgUSzCKewucAAuMLaxurIZhVlsqxSrcbi_ABAAMCAAN3AAM2BA.png"><img>

# 配置场景
## 添加并配置Image Tracking
1. 在GameObject中找到EasyAR Sense > Image tracking 然后分别添加AR Session （Image Tracking Preset）和Target:Image Target
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPXaTLiPTSuP7PpXEdyYjTQ59pv7VsAAuQLaxurIZhVr9nOVos1cSwBAAMCAAN3AAM2BA.png"><img>

2. 在Assets文件夹中新建StreamingAssets文件夹，将想要识别的图片放进去(这里用miku.jpg演示)

3. 在场景中找到Image Target的检视面板，里面有个Script叫做Image Target Controller，将Path Type设置成Streaming Assets，Path填写刚刚放入的图片名（要带后缀）
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPYaTLiS1VTJP3BSQF9vUfP9OdxZEMAAuULaxurIZhVI4kRIakdkRUBAAMCAAN3AAM2BA.png"><img>

## 添加识别后显示的场景
1. 将场景放入Image Target这个Object的子级（这边使用Cube演示）
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPZaTLiVod_odgbW0kKTt_rHtEIZ8oAAuYLaxurIZhVBi_8MI-1AAH6AQADAgADdwADNgQ.png">

2. 打开Main Camera的Inspector面板，将Clear Flags设置为Solid Color
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPaaTLibDkHepQcNa5t37YrDmoYsxQAAucLaxurIZhVAAFG2kTINGUfAQADAgADdwADNgQ.png">

# Q&A
## 无法打开“LibEasyAR.dylib”因为Apple无法检查其是否包含恶意软件。
1. 点击在访达中显示
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPbaTLieF-AIKRWVE3ZS2o7YUV7akYAAugLaxurIZhVeGU0stndYQsBAAMCAAN3AAM2BA.png"><img>
2. 打开设置>安全与隐私
3. 点击已阻止使用“xxxxxx”后面的“允许访问”
<img src="https://telegraph-image-6j7.pages.dev/file/AgACAgUAAyEGAASIHQfFAAPcaTLigxv1ki9ySDjji6-eiWhJbvAAAukLaxurIZhVLDngDcrbnzEBAAMCAAN5AAM2BA.png"><img>