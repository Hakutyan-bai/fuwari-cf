---
title: Linux配置JDK环境
published: 2025-07-28
description: ''
image: ''
tags: [Linux,Java]
category: '文档'
draft: false 
lang: ''
updated: 2025-07-28 21:00:00
series: Linux
---

# Ubuntu 设置 Java JDK 环境变量教程

本教程介绍如何在 Ubuntu 系统中安装 Java JDK 并正确设置环境变量，适用于 JDK8、JDK11、JDK17 等版本，支持手动安装或通过 apt 包管理器安装的场景。

---

## 1. 检查当前是否已安装 JDK

```bash
java -version
javac -version
```

如果没有输出或提示 `command not found`，说明尚未安装 JDK。

---

## 2. 安装 JDK

### 方式一：通过 apt 安装 OpenJDK

```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

安装完成后可通过以下命令验证：

```bash
java -version
javac -version
```

### 方式二：手动下载 JDK（适用于 Oracle JDK）

1. 访问 Oracle 官网或 https://jdk.java.net/ 下载对应版本的 JDK 安装包。
2. 解压到指定目录，例如：

```bash
tar -xzf jdk-17_linux-x64_bin.tar.gz
sudo mv jdk-17 /usr/lib/jvm/
```

---

## 3. 设置环境变量

假设你的 JDK 安装路径为：`/usr/local/jdk-17`

编辑当前用户的环境配置文件（推荐）：

```bash
vim ~/.bashrc
```

添加以下内容到文件末尾：

```bash
export JAVA_HOME=/usr/lib/jvm/jdk-17
export PATH=$JAVA_HOME/bin:$PATH
```

如果你使用的是 Zsh，可修改 `~/.zshrc` 文件。

使配置立即生效：

```bash
source ~/.bashrc
```

---

## 4. 全局设置环境变量（可选）

修改全局环境变量配置文件：

```bash
sudo vim /etc/profile.d/jdk.sh
```

写入以下内容：

```bash
export JAVA_HOME=/usr/lib/jvm/jdk-17
export PATH=$JAVA_HOME/bin:$PATH
```

保存后赋予执行权限：

```bash
sudo chmod +x /etc/profile.d/jdk.sh
```

重新登录或执行 `source /etc/profile` 生效。

---

## 5. 配置默认 JDK（多版本共存时）

查看当前已安装的 JDK 列表：

```bash
sudo update-alternatives --config java
```

根据提示输入对应序号切换默认 JDK。

如未注册也可以手动添加：

```bash
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-17/bin/java 1
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk-17/bin/javac 1
```

---

## 6. 验证环境变量

```bash
echo $JAVA_HOME
which java
java -version
```

---

文章编辑：`@鈴奈咲桜`
