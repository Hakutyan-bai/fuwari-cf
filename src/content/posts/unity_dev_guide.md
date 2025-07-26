---
title: "Unity&Csharp开发实用文档"
published: 2025-07-10
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
series: Csharp
updated: 2025-07-26 10:00:00
---
# Unity 项目开发实用文档（C#）

本实用文档总结了在 Unity 使用 C# 开发时常见功能的基本实现，包括画布与 UI 设置、关卡切换、实体碰撞、音效播放、数据存储、角色控制等内容，适合快速参考与项目模板搭建。

---

## 1. 设置画布与 UI 元素

### 创建画布（Canvas）

Unity 中创建 UI 元素时，系统会自动添加 Canvas，通常使用 Screen Space - Overlay 模式。

**示例：动态创建 Canvas 和一个按钮**

```csharp
using UnityEngine;
using UnityEngine.UI;

public class CreateCanvas : MonoBehaviour
{
    void Start()
    {
        GameObject canvasObj = new GameObject("Canvas");
        Canvas canvas = canvasObj.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasObj.AddComponent<CanvasScaler>();
        canvasObj.AddComponent<GraphicRaycaster>();

        GameObject buttonObj = new GameObject("Button");
        buttonObj.transform.SetParent(canvasObj.transform);
        Button button = buttonObj.AddComponent<Button>();
        buttonObj.AddComponent<Image>();

        RectTransform rt = buttonObj.GetComponent<RectTransform>();
        rt.sizeDelta = new Vector2(160, 30);
        rt.anchoredPosition = new Vector2(0, 0);
    }
}
```

---

## 2. UI 按钮点击事件绑定

```csharp
using UnityEngine;
using UnityEngine.UI;

public class ButtonHandler : MonoBehaviour
{
    public Button myButton;

    void Start()
    {
        myButton.onClick.AddListener(OnClickHandler);
    }

    void OnClickHandler()
    {
        Debug.Log("按钮被点击了！");
    }
}
```

---

## 3. 切换场景（关卡）

Unity 场景切换通过 `SceneManager` 实现。

```csharp
using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwitcher : MonoBehaviour
{
    public void LoadSceneByName(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }

    public void ReloadCurrentScene()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
```

**注意：使用此功能前需在 `File > Build Settings` 中将场景加入 Build 列表。**

---

## 4. 实体碰撞检测

### 4.1 使用 OnCollisionEnter（需要 Rigidbody 和 Collider）

```csharp
using UnityEngine;

public class CollisionExample : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("碰撞到了: " + collision.gameObject.name);
    }
}
```

### 4.2 使用 OnTriggerEnter（需勾选 Collider 的 IsTrigger）

```csharp
using UnityEngine;

public class TriggerExample : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("触发器检测到对象: " + other.name);
    }
}
```

**注意：确保至少有一个物体附加 Rigidbody 组件。**

---

## 5. 音效播放

### 5.1 播放一次音效（适用于点击、跳跃等）

```csharp
using UnityEngine;

public class AudioExample : MonoBehaviour
{
    public AudioClip clip;
    private AudioSource audioSource;

    void Start()
    {
        audioSource = gameObject.AddComponent<AudioSource>();
    }

    public void PlaySound()
    {
        audioSource.PlayOneShot(clip);
    }
}
```

### 5.2 循环播放背景音乐

```csharp
void Start()
{
    audioSource = gameObject.AddComponent<AudioSource>();
    audioSource.clip = clip;
    audioSource.loop = true;
    audioSource.Play();
}
```

---

## 6. 数据存储（PlayerPrefs）

### 6.1 存储与读取整数、字符串、浮点数

```csharp
// 保存
PlayerPrefs.SetInt("score", 100);
PlayerPrefs.SetString("playerName", "Ryo");
PlayerPrefs.SetFloat("volume", 0.8f);

// 读取
int score = PlayerPrefs.GetInt("score", 0);
string name = PlayerPrefs.GetString("playerName", "Default");
float volume = PlayerPrefs.GetFloat("volume", 1.0f);

// 删除数据
PlayerPrefs.DeleteKey("score");

// 清空所有数据
PlayerPrefs.DeleteAll();
```

---

## 7. 角色移动控制器（基础）

### 7.1 基于 CharacterController 控件的简单移动和跳跃

```csharp
using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class SimplePlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    public float jumpHeight = 2f;
    public float gravity = -9.81f;

    private CharacterController controller;
    private Vector3 velocity;
    private bool isGrounded;

    void Start()
    {
        controller = GetComponent<CharacterController>();
    }

    void Update()
    {
        isGrounded = controller.isGrounded;
        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }

        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");
        Vector3 move = transform.right * x + transform.forward * z;

        controller.Move(move * moveSpeed * Time.deltaTime);

        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }

        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
    }
}
```

---

## 8. 常用实用代码片段

### 8.1 延迟执行（协程）

```csharp
IEnumerator DelayedAction()
{
    yield return new WaitForSeconds(2f);
    Debug.Log("两秒后执行");
}
```

### 8.2 查找游戏对象与组件

```csharp
GameObject obj = GameObject.Find("Player");
Rigidbody rb = obj.GetComponent<Rigidbody>();
```

### 8.3 销毁对象

```csharp
Destroy(gameObject); // 立即销毁自身
Destroy(obj, 2f);    // 延迟 2 秒销毁
```

---

## 9. 开发调试建议

- 使用 `Debug.Log` 输出调试信息。
- 利用 `Gizmos` 可视化碰撞体与检测区域。
- 多使用 Prefab，提高 UI 和实体复用性。
- 合理分离 UI 与逻辑代码，使用 MVC/MVVM 架构更利于维护。
- 使用 ScriptableObject 管理全局数据更为优雅。

---

## 10. 项目依赖建议

- **TextMeshPro**：推荐替代原生 Text，显示更清晰。
- **DOTween**：用于动画补间。
- **Unity Input System**：新版输入系统，支持手柄与键鼠切换。
- **Cinemachine**：高级相机控制解决方案。

---

## 附录：推荐资源

- Unity 官方文档：

https://docs.unity3d.com/cn/

- Unity Learn 教程：

https://learn.unity.com/

- Asset Store 工具包：

https://assetstore.unity.com/

- DOTween：

https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676

---

文章编辑：`@鈴奈咲桜`