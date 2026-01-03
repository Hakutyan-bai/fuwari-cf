---
title: 如何下载 Apple Music 中的音乐
published: 2026-01-04
description: '如何使用 Apple Music Downloader 下载高品质音频、音乐视频和播放列表'
image: ''
tags: [Apple Music,工具推荐]
category: '工具推荐'
draft: false 
lang: ''
updated: 2026-01-04 00:00:00
---

## 环境要求

### 必需组件

在开始使用之前，请确保您的系统满足以下要求：

- **有效的 Apple Music 订阅** - 需要登录 Apple Music 账户
- **Netscape 格式的 Cookies 文件** - 用于身份验证

### 获取 Cookies 文件

Cookies 文件是使用该工具的关键，用于验证您的 Apple Music 订阅：
**Chrome/Edge 用户：**
1. 安装 [Open Cookies.txt](https://chromewebstore.google.com/detail/open-cookiestxt/gdocmgbfkjnnpapoeobnolbbkoibbcif) 扩展
2. 登录 Apple Music 网页版
3. 使用扩展导出 cookies.txt 文件

## 安装方法

### 方法一：使用安装程序（推荐，Windows 系统）

这是最简单的安装方式，适合不熟悉编程的用户：

1. **下载安装程序**
   - 访问 [GitHub Releases 页面](https://github.com/wenfeng110402/AppleMusic-Downloader/releases)
   - 下载最新版本的 `AppleMusicDownloader_Setup.exe`

2. **运行安装程序**
   - 双击 `AppleMusicDownloader_Setup.exe`
   - 按照安装向导提示完成安装
   - 选择安装目录（建议使用默认路径）

3. **启动程序**
   - 安装完成后，在开始菜单中找到 "Apple Music Downloader"
   - 双击启动程序

### 方法二：从源码运行

适合有一定编程基础的用户，可以体验最新功能：

1. **克隆项目**
```bash
git clone https://github.com/wenfeng110402/AppleMusic-Downloader.git
cd AppleMusic-Downloader
```

2. **安装依赖**
```bash
pip install -r requirements.txt
```

3. **运行程序**
```bash
python -m gamdl
```

## 支持的链接类型

Apple Music Downloader 支持下载以下类型的内容：

- **单曲** - 个别歌曲下载
- **专辑** - 整张专辑批量下载  
- **播放列表** - 自定义播放列表下载
- **音乐视频** - 高清音乐 MV 下载
- **艺术家主页** - 艺术家所有作品下载
- **帖子视频** - Apple Music 社区视频内容

## 图形界面使用教程

### 主界面介绍

程序启动后，您将看到一个现代化的图形界面，主要包含三个标签页：

#### 1. 下载标签页

这是主要的操作界面：

- **URL 输入框** - 粘贴 Apple Music 链接
- **Cookie 文件路径** - 选择之前导出的 cookies.txt 文件
- **输出目录** - 选择下载文件的保存位置
- **下载选项** - 各种下载设置的复选框

#### 2. 设置标签页  

包含高级配置选项：

- **音频设置** - 编解码器、品质选择
- **文件命名** - 自定义文件命名模板
- **路径设置** - 临时文件、工具路径配置

#### 3. 许可证标签页

用于管理许可证文件（如需要）。

### 基本使用流程

#### 步骤 1：配置 Cookie 文件

1. 点击"浏览"按钮，选择之前导出的 `cookies.txt` 文件
2. 确保文件路径正确显示在输入框中

#### 步骤 2：设置输出目录

1. 点击输出目录旁的"浏览"按钮
2. 选择您希望保存下载文件的文件夹
3. 建议创建专门的音乐下载文件夹

#### 步骤 3：输入下载链接

1. 打开 Apple Music，找到您要下载的内容
2. 复制链接地址（在浏览器中或通过分享功能获取）
3. 将链接粘贴到 URL 输入框中
4. 支持同时输入多个链接，每行一个

#### 步骤 4：配置下载选项

根据需要勾选以下选项：

- **覆盖已存在文件** - 重新下载已有文件
- **禁用音乐视频跳过** - 下载专辑中的音乐视频
- **保存播放列表** - 保存播放列表信息
- **仅同步歌词** - 只下载同步歌词
- **无同步歌词** - 跳过同步歌词下载

#### 步骤 5：开始下载

1. 点击"开始下载"按钮
2. 程序将在日志区域显示下载进度
3. 下载完成后，文件将保存到指定目录

### 高级设置说明

#### 音频编码选项

- **AAC Legacy** - 兼容性最好的格式
- **AAC** - 高品质 AAC 格式
- **ALAC** - Apple 无损音频编解码器
- **FLAC** - 开源无损格式

#### 视频编码选项

- **H.264** - 通用性最好的视频格式
- **H.265** - 更高压缩率，更小文件
- **Auto** - 自动选择最佳格式



## 使用技巧与注意事项
### 常见问题解决

#### 问题 1：Cookie 验证失败

**解决方案：**
- 确保 Apple Music 订阅有效
- 重新导出最新的 cookies 文件
- 检查文件格式是否为 Netscape 格式

#### 问题 2：下载中断

**解决方案：**
- 检查网络连接
- 确认 Apple Music 链接有效
- 重启程序重新尝试

### 法律声明

**重要提醒**：
- 请确保您拥有合法的 Apple Music 订阅
- 下载的内容仅供个人使用
- 不得用于商业用途或重新分发
- 遵守当地版权法律法规

---

**项目信息：**
- GitHub 地址：[wenfeng110402/AppleMusic-Downloader](https://github.com/wenfeng110402/AppleMusic-Downloader)  
- 许可证：MIT License
- 开发语言：Python

---

文章编辑：`@鈴奈咲桜`