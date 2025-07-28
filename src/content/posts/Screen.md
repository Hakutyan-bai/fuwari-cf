---
title: Linux终端必备--Screen
published: 2025-07-28
description: ''
image: ''
tags: [Linux]
category: '文档'
draft: false 
lang: ''
updated: 2025-07-28 20:00:00
series: Linux
---

# 基础教程

本实用文档整理了 Screen 常用的终端命令。

---

## 安装Screen

```bash
# CentOS
yum install screen
# Debian/Ubuntu
apt install screen
```
### 检测是否安装成功

```bash
screen -v
```

## 基本命令

### 查看帮助

```bash
screen -help
```

### 列出终端

```bash
screen -ls
```

### 新建终端

创建一个名称为`new`的虚拟终端
```bash
screen -S new
```

### 回到终端

回到名称为 `new` 的终端
```bash
screen -r new
```

### 清除终端
回到你要清除的终端
```bash
exit
```

## 推荐使用场景

Minecraft Server
Frp内网穿透
后台下载

---

文章编辑：`@鈴奈咲桜`


