---
title:  NAT1 Traversal 教程
published: 2025-07-14
description: ''
image: ''
tags: []
category: '教程'
draft: false 
lang: ''
updated: 2025-07-18 20:00:00
---
# NAT1 Traversal 教程
## 本文章为最基础教程，结尾附[原作者视频](/posts/nat1_traversal/#%E8%BF%98%E5%8F%AF%E4%BB%A5%E7%BB%91%E5%AE%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F%E5%90%8D%E6%8E%A8%E8%8D%90%E8%A7%82%E7%9C%8B%E5%8E%9F%E4%BD%9C%E8%80%85%E8%A7%86%E9%A2%91)
## 🚀 快速开始

### 🔽 下载发行版

::github{repo="Guation/nat1_traversal"}

- **NAT1_Traversal_nt.zip**：自带 Python 运行环境，仅限 Windows 平台使用。  
- **NAT1_Traversal.tgz / NAT1_Traversal.zip**：需自备 Python 3.8+ 运行环境，支持全平台。

:::note
需要设备与光猫之间是同一网段
:::

### 📁 解压与运行

1. 下载完成后，**解压到任意文件夹**。
2. 在该文件夹内 **按住 Shift + 鼠标右键**，选择“在此处打开 PowerShell 窗口”。

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMFaGp_K6pUozQtfrZhHI0g4ktyK8EAAo_JMRs2wlFXVHUuSYzgW9IBAAMCAAN5AAM2BA.png" width="600">

3. 在 PowerShell 中输入以下命令，测试 NAT 类型：

```powershell
.\nat1_traversal.exe -t
```

> 💡 **提示**：出现防火墙提示请选择“允许访问”。

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMGaGqAT4rk8TfJgvXOfAABJvT59T2HAAKRyTEbNsJRVz8GfMwNtixoAQADAgADeQADNgQ.png" width="600">

此处检测到的 NAT 类型为 **NAT3（端口限制锥）**。  
我们需要将其转为 **NAT1（全锥型）**。

---

## 🌐 设置端口映射

1. 打开浏览器，登录光猫后台（此处以电信为例）。
2. 进入 **高级设置 → 端口映射**，添加端口映射规则如下：

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMHaGqCPEgcz5YLVsqAg2M6CauMA9kAApLJMRs2wlFXJFqmno0FS3gBAAMCAAN5AAM2BA.png" width="600">

3. 回到 PowerShell，再次输入以下命令进行测试：

```powershell
.\nat1_traversal.exe -t -l :22333
```

> 💡 请将 `22333` 替换为你刚刚在路由器中配置的映射端口。

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMIaGqDtOX-trT5a8f-F-0iPi5kDGEAApXJMRs2wlFX7EP4el1fufIBAAMCAAN5AAM2BA.png" width="600">

此时可以看到 NAT 类型变成了 **NAT1**，说明映射成功！

---

## 🧪 端口转发本地服务

假设你有一个本地服务运行在端口 `7860`，我们希望将其通过 `nat1_traversal` 暴露到公网：

```powershell
.\nat1_traversal.exe -l :23333 -r :7860
```

<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAAMJaGqEas7XmyEwJaaB3vlv1WC5axAAApbJMRs2wlFXp804OY8U8nQBAAMCAAN5AAM2BA.png" width="600">

如果设置无误，此时你可以通过访问以下公网地址访问本地服务：

```
http://183.13.190.136:4044
```
还可以绑定自定义域名，推荐观看原作者视频

---



## 这个是原作者的视频


<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1GeuuzWEgg&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>


---

文章编辑：`@鈴奈咲桜`