---
title: Linux常用命令
published: 2025-07-28
description: ''
image: ''
tags: [Linux]
category: '文档'
draft: false 
lang: ''
updated: 2025-07-28 10:00:00
series: Linux
---

# Ubuntu 常用终端命令实用文档

本实用文档整理了 Ubuntu Linux 系统中常用的终端命令，包括文件操作、系统资源查看、软件管理、网络调试等，适用于日常开发与服务器运维场景。

---

## 1. 文件压缩与解压

### 1.1 压缩文件

- `.tar.gz` 格式压缩：

```bash
tar -czvf archive.tar.gz folder_name/
```

- `.zip` 格式压缩：

```bash
zip -r archive.zip folder_name/
```

### 1.2 解压文件

- 解压 `.tar.gz` 文件：

```bash
tar -xzvf archive.tar.gz
```

- 解压 `.zip` 文件：

```bash
unzip archive.zip
```

---

## 2. 查看系统资源

### 2.1 查看 CPU 信息与频率

```bash
lscpu
cat /proc/cpuinfo | grep "MHz"
watch grep 'cpu MHz' /proc/cpuinfo
```

### 2.2 查看内存使用情况

```bash
free -h
```

### 2.3 实时监控资源

```bash
top          # 实时查看进程
htop         # 更友好的进程查看（需安装）
watch -n 1 free -h   # 每秒刷新内存情况
```

---

## 3. 软件安装与更新

### 3.1 更新软件源

```bash
sudo apt update
sudo apt upgrade
```

### 3.2 安装软件包

```bash
sudo apt install <package_name>
```

例如：安装 curl

```bash
sudo apt install curl
```

### 3.3 卸载软件包

```bash
sudo apt remove <package_name>
```

---

## 4. 网络命令

### 4.1 查看本机 IP 地址

```bash
ip a
```

### 4.2 Ping 测试

```bash
ping www.baidu.com
```

### 4.3 检查端口占用

```bash
sudo lsof -i :端口号
```

例如：

```bash
sudo lsof -i :8080
```

### 4.4 查看路由表

```bash
ip route
```

---

## 5. 文件与目录操作

```bash
ls -al          # 查看目录下所有文件（含隐藏）
cd /path        # 进入目录
pwd             # 显示当前目录路径
cp a.txt b.txt  # 复制文件
mv a.txt b.txt  # 移动或重命名文件
rm file.txt     # 删除文件
rm -r folder    # 删除文件夹
```

---

## 6. 权限相关

```bash
chmod +x file.sh        # 添加可执行权限
chown user:user file    # 修改文件所有者
```

切换用户：

```bash
su username
```

---

## 7. 进程管理

```bash
ps aux               # 查看所有进程
kill PID             # 杀死指定进程
kill -9 PID          # 强制杀死进程
```

查找进程 PID：

```bash
ps aux | grep node
```

---

## 8. 磁盘与挂载

```bash
df -h                 # 查看磁盘使用情况
du -sh *              # 查看当前目录大小
mount                 # 查看挂载信息
```

---

## 9. 日志查看

```bash
tail -n 100 file.log     # 查看最后 100 行
tail -f file.log         # 实时查看日志更新
journalctl -xe           # 系统服务日志查看
```

---

## 10. 常用快捷命令

```bash
ctrl + c     # 中断当前命令
ctrl + d     # 退出终端/子 Shell
ctrl + r     # 搜索历史命令
tab          # 自动补全命令或文件路径
```

---

## 附录资源

- Ubuntu 官方文档：

https://ubuntu.com/tutorials

- Linux 命令大全：

https://man.linuxde.net

- VTLearn Linux 教程：

https://vtlearn.linuxcool.com

---

文章编辑：`@鈴奈咲桜`