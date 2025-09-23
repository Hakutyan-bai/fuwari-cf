---
title: Docker 部署 v2rayA 单点代理
published: 2025-09-23
description: '别让网速拖后腿'
image: ''
tags: [Docker,v2rayA]
category: '代理上网'
draft: false 
lang: ''
updated: 2025-09-23 22:30:00
---
## 在一台 Linux 服务器上使用 Docker 部署v2rayA
1. 拉取镜像
```
docker pull mzz2017/v2raya
```
2. 启动容器
```
docker run -d \
  --restart=always \
  --privileged \
  --network=host \
  --name v2raya \
  -e V2RAYA_LOG_FILE=/tmp/v2raya.log \
  -e V2RAYA_V2RAY_BIN=/usr/local/bin/v2ray \
  -e V2RAYA_NFTABLES_SUPPORT=off \
  -e IPTABLES_MODE=legacy \
  -v /lib/modules:/lib/modules:ro \
  -v /etc/resolv.conf:/etc/resolv.conf \
  -v /etc/v2raya:/etc/v2raya \
  mzz2017/v2raya
```
3. 导入订阅：打开http://localhost:2017
4. 运行V2rayA

## 使用 proxychains代理
1. 安装
```
sudo apt update 
sudo apt install proxychains
```
2. 编辑配置文件
```
sudo vim /etc/proxychains.conf
```
```conf title="/etc/proxychains.conf"
socks5 127.0.0.1 20170
```

## 测试&使用方法
测试
```
proxychains curl https://www.google.com
```
使用，例如：
```
proxychains git clone https://github.com/....................
```

---

文章编辑：`@鈴奈咲桜`