---
title: 最新docker镜像源
published: 2025-09-06
description: '自己测的超级快'
image: ''
tags: [Docker]
category: 'Docker'
draft: false 
lang: ''
updated: 2025-09-06 22:30:00
---

```ts title="/etc/docker/daemon.json"
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://docker.1ms.run",
    "https://docker.m.daocloud.io",
    "https://dhub.kubesre.xyz",
    "https://docker.1panel.live"
  ]
}
```

完成编辑后，重新加载 daemon.json 文件并重启 Docker：

```
sudo systemctl daemon-reload
sudo systemctl restart docker
```


---

文章编辑：`@鈴奈咲桜`