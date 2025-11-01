---
title: "Yazi：快速轻量的终端文件管理器安装与使用指南"
published: 2025-11-01
description: "Yazi 是用 Rust 编写的现代化终端文件管理器，支持异步 I/O、图片预览、模糊搜索等强大功能。本文详细介绍安装、配置与实战技巧。"
image: ""
tags: [Yazi, 终端, 文件管理器, Rust, 开源工具]
category: '工具'
draft: false
lang: 'zh_CN'
updated: 2025-11-01 12:00:00
---

## Yazi 是什么？

**Yazi** 是一款用 Rust 编写的现代化终端文件管理器，以其**快速、异步、跨平台**的特性脱颖而出。相比传统的 Ranger 或 nnn，Yazi 采用异步 I/O 架构，在大量文件浏览与预览时性能更优，并内置了：

-  **异步文件操作**：大文件目录下几乎无卡顿
-  **图片预览**：支持终端内直接预览图片（通过 `ueberzugpp` 或 Kitty 协议）
-  **模糊搜索与筛选**：集成 fzf 风格快速定位文件
-  **Vim 风格键位**：高效导航与批量操作
-  **高度可定制**：通过 Lua 插件扩展功能

> 官方仓库：[https://github.com/sxyazi/yazi](https://github.com/sxyazi/yazi)

---

## 安装方法

### macOS（通过 Homebrew）

首先确保已安装 Homebrew，若未安装可运行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后直接安装 Yazi：

```bash
brew install yazi
```

安装完成后检查版本：

```bash
yazi --version
```

### Linux（各发行版）

**Arch Linux / Manjaro**：
```bash
sudo pacman -S yazi
```

**Ubuntu / Debian**（需先安装 Cargo）：
```bash
cargo install --locked yazi-fm
```

**Fedora**：
```bash
sudo dnf install yazi
```

### Windows（通过 Scoop 或 Cargo）

**Scoop**：
```powershell
scoop install yazi
```

**Cargo**（需先安装 Rust）：
```bash
cargo install --locked yazi-fm
```

---

## 基础使用

### 启动 Yazi

在终端中输入：

```bash
yazi
```

即可进入文件管理界面。Yazi 默认显示三列：
- **左侧**：父级目录
- **中间**：当前目录文件列表
- **右侧**：文件预览（支持文本、图片、代码高亮等）

### 常用快捷键

| 快捷键 | 功能 |
|-------|------|
| `j` / `k` | 上下移动 |
| `h` / `l` | 返回上级 / 进入目录 |
| `gg` / `G` | 跳到顶部 / 底部 |
| `Space` | 选中当前文件（多选） |
| `y` | 复制选中文件 |
| `d` | 剪切选中文件 |
| `p` | 粘贴文件 |
| `r` | 重命名当前文件 |
| `x` | 删除选中文件 |
| `/` | 搜索当前目录 |
| `z` | 跳转到最近访问目录（需启用 zoxide） |
| `:` | 进入命令模式 |
| `q` | 退出 Yazi |

### 文件预览

Yazi 支持多种文件类型的预览：
- **文本文件**：自动高亮代码（需安装 `bat` 或 `highlight`）
- **图片**：终端内预览（需 `ueberzugpp` 或 Kitty/WezTerm）
- **PDF / 视频**：显示元信息
- **压缩包**：列出内部文件

---

## 进阶配置

### 配置文件路径

Yazi 的配置文件位于：

- **macOS / Linux**：`~/.config/yazi/`
- **Windows**：`%APPDATA%\yazi\config\`

主要配置文件：
- `yazi.toml`：核心配置
- `keymap.toml`：自定义键位
- `theme.toml`：主题配色

### 开启图片预览（推荐）

安装 `ueberzugpp`（跨终端兼容）：

**macOS**：
```bash
brew install jstkdng/programs/ueberzugpp
```

**Arch Linux**：
```bash
yay -S ueberzugpp
```

然后在 `yazi.toml` 中启用：

```toml
[preview]
image_method = "ueberzug"
```

### 集成 zoxide（快速跳转）

安装 zoxide：
```bash
brew install zoxide  # macOS
cargo install zoxide  # 跨平台
```

在 shell 配置中添加初始化（`~/.zshrc` 或 `~/.bashrc`）：
```bash
eval "$(zoxide init zsh)"  # 或 bash
```

在 Yazi 中按 `z` 后输入目录名即可快速跳转。

### 自定义键位示例

编辑 `~/.config/yazi/keymap.toml`，例如将 `dd` 映射为删除：

```toml
[[manager.prepend_keymap]]
on = [ "d", "d" ]
exec = "remove"
desc = "Delete selected files"
```

---

## 实用技巧

### 批量重命名

1. 用 `Space` 选中多个文件
2. 按 `r` 进入批量重命名模式
3. 在编辑器中修改文件名（支持正则替换）
4. 保存退出即可批量应用

### 书签与快速跳转

按 `m` + `字母` 可标记当前目录为书签，之后按 `'` + `字母` 快速返回。

### 在 Yazi 中执行 Shell 命令

按 `:` 进入命令模式，输入 Shell 命令，例如：
```
:!git status
```

### 集成到 Vim/Neovim

在 Neovim 中可通过插件 `yazi.nvim` 集成：

```lua
use 'mikavilpas/yazi.nvim'
```

配置快捷键打开 Yazi 浏览文件。

---

## 常见问题（FAQ）

**Q：图片预览不显示怎么办？**  
A：确保已安装 `ueberzugpp` 并在 `yazi.toml` 中配置 `image_method = "ueberzug"`，同时检查终端是否支持（推荐 Kitty、WezTerm、Alacritty）。

**Q：如何退出 Yazi 并切换到当前目录？**  
A：可以在 shell 配置中添加 wrapper 函数（见官方文档），实现退出后自动 `cd` 到 Yazi 最后访问的目录。

**Q：支持鼠标操作吗？**  
A：Yazi 原生支持鼠标点击与滚动，在现代终端中开箱即用。

---

## 总结

Yazi 是一款兼具速度与美观的终端文件管理器，特别适合：
- 频繁在终端中浏览大量文件的开发者
- 需要快速预览图片/代码的用户
- 希望通过键盘高效管理文件的 Vim 用户

通过本文的配置与技巧，你可以打造一套高效的终端文件管理工作流。如果你在使用中遇到问题，欢迎查阅 [官方文档](https://yazi-rs.github.io/) 或加入社区讨论。

：：：note
推荐阅读：[Yazi 官方配置示例](https://github.com/sxyazi/yazi/tree/main/yazi-config/preset) 与 [插件列表](https://github.com/yazi-rs/plugins)
：：：

---
文章编辑：`@鈴奈咲桜`