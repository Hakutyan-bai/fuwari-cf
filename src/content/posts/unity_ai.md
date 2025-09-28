---
title: Unity的Ai寻路
published: 2025-09-28
description: ''
image: ''
tags: [Unity]
category: '文档'
draft: false 
lang: ''
series: Unity开发
updated: 2025-09-28 17:30:00
---
# 注意事项
1. 2022版本及以上需要在包管理器中添加包

# 基础教程
1. 场景搭建
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANsaNkKt7Jk6-1MW8HqS6uqeP6xXvIAAu3LMRvGv8lWVSeo12gqpHkBAAMCAAN3AAM2BA.png">

2. 安装AI Navigation包
:::note
2021及以下版本在 **窗口-AI-Navigation**中，无需安装
:::
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANtaNkLRw4pb0x5gmya9Q6JNOcb86cAAvLLMRvGv8lWd6tllodh3ToBAAMCAAN3AAM2BA.png">

3. 给胶囊体添加Nav Mesh agent组件
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANuaNkLuWhKBH0Ba2xj8D7pHCeXpNsAAvbLMRvGv8lW25wtEIbthIIBAAMCAAN3AAM2BA.png">

4. 给场景里所有物体添加Nav Mesh Surface组件
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANvaNkMJHA8NIO3v7UIJMg__f8yyqgAAvjLMRvGv8lWU_4Dy8_XOLgBAAMCAAN3AAM2BA.png">

5. 烘焙路径
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANwaNkMXQABDr1peGtJZwABwY1n1XO6_AAC-csxG8a_yVYez8GEH9qNPAEAAwIAA3cAAzYE.png">

6. 编写脚本：PlayerController.cs
```cs title="PlayerController.cs"  {6}
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class PlayerController : MonoBehaviour
{
    private NavMeshAgent agent;
    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
    }
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            if (Physics.Raycast(ray, out hit))
            {
                Vector3 targetPosition = hit.point;
                agent.SetDestination(hit.point);
            }
        }
    }
}
```
7. 将脚本挂载到胶囊体然后运行游戏
---

文章编辑：`@鈴奈咲桜`