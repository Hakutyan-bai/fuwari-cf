---
title: Unity的动画
published: 2025-10-14
description: ''
image: ''
tags: [Unity]
category: '文档'
draft:  false
lang: ''
series: Unity开发
updated: 2025-10-14 23:30:00
---
ok啊又是unity系列的文章，今天来讲动画
今天太累了，改日再写
先写个脚本吧
## 玩家控制脚本
```cs title="PlayerController.cs"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    private Animator ani;
    public int speed = 2;

    void Start()
    {
        ani=GetComponent<Animator>(); // 获取组件
    }

    void Update()
    {
        float vertical=Input.GetAxis("Vertical");  // 获取轴 垂直
        float horizontal = Input.GetAxis("Horizontal"); // 获取轴 水平
        Vector3 dir=new Vector3(horizontal,0,vertical); // 三维向量
        if(dir!=Vector3.zero) // 如果三维向量不等于0
        {
            transform.rotation=Quaternion.LookRotation(dir); // 先转向
            //transform.Translate(Vector3.forward*speed*Time.deltaTime); // 移动 速度乘以时间，这里注释掉是因为用下面的
            ani.SetBool("Walk",true); // 设置布尔 播放走路动画 以实际动画名称为准
        }
        else{
            ani.SetBool("Walk",false); // 同上 以实际动画名称为准
        }
    }
}
```
## 动画控制脚本
```cs title="PlayerController.cs"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Anime : MonoBehaviour

{
    private Animation ani;
    void Start()
    {
        ani=transform.GetChild(0).GetComponent<Animation>(); // 先获取子元素的组件
    }

    void Update()
    {
        
    }
    public void OnTriggerEnter(Collider other) // 触碰到触发器
    {
        ani.Play("open door"); // 播放动画 以实际动画名称为准
    }
    public void OnTriggerExit(Collider other) // 离开触发器
    {
        ani.Play("close door"); // 播放动画 以实际动画名称为准
    }
}
```
## 注意事项
### Player飞了怎么办？
刚体的 **Constraints** 中勾选“冻结旋转XYZ轴”

### 动画卡卡的怎么办？
在 **动画器的过渡** 中取消勾选“有退出时间”

---

文章编辑：`@鈴奈咲桜`