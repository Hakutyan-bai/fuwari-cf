<!-- # About
本博客使用框架 `astro` 以及 `Fuwari` 主题

::github{repo="withastro/astro"}
::github{repo="saicaca/fuwari"} -->

<!-- 使用图床
::github{repo="cf-pages/Telegraph-Image"} -->

<!-- # About Me
`@鈴奈咲桜`、`@Hakutyan_bai`这都是我


> 27年毕业的大学生

>平时喜欢写写博客，找一些好玩的项目搭建到赛博活佛[CloudFlare](https://cloudflare.com)上

>学过Unity和C#

>也会写一些Minecraft模组

# 好きなもの


# 媒体来源
> 如有侵权，请通过[邮件](mail:yukikohk@163.com)联系我进行删除 -->

<!-- > ### Sources of images used in this site
> - [Unsplash](https://unsplash.com/)
> - [星と少女](https://www.pixiv.net/artworks/108916539) by [Stella](https://www.pixiv.net/users/93273965)
> - [Rabbit - v1.4 Showcase](https://civitai.com/posts/586908) by [Rabbit_YourMajesty](https://civitai.com/user/Rabbit_YourMajesty) -->

<style>
.language-container {
  position: relative;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.language-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;  /* 使用visibility替代display */
  pointer-events: none;  /* 禁用未激活内容的交互 */
}

.language-section.active {
  opacity: 1;
  transform: translateY(0);
  position: relative;
  visibility: visible;
  pointer-events: auto;
}
/* 禁用全局的 outline 和 text-decoration */
a, a:focus, a:active, a:focus-visible {
  outline: none !important;
  text-decoration: none !important;
  border: none !important;
  box-shadow: none !important;
}

</style>

<div class="flex items-center justify-center gap-4">


  <a href="#zh" onclick="switchLanguage('zh')" class="font-bold overflow-hidden active:scale-95">
    <div class="btn-card max-w-fit rounded-md h-[2.75rem] px-4 flex items-center justify-start gap-2 bg-black/5 dark:bg-white/10">
      <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap text-[var(--primary)]/75 dark:text-[var(--primary)]/75">
        中文
      </div>
    </div>
  </a>
  <div class="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
  <a href="#jp" onclick="switchLanguage('jp')" class="font-bold overflow-hidden active:scale-95">
    <div class="btn-card max-w-fit rounded-md h-[2.75rem] px-4 flex items-center justify-start gap-2 bg-black/5 dark:bg-white/10">
      <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap text-[var(--primary)]/75 dark:text-[var(--primary)]/75">
        日本語
      </div>
    </div>
  </a>
</div>

<div class="language-container show-zh">

  
  <div id="zh-section" class="language-section active">

<br/> 

# 🌱 关于我

## 👋 你好, 我是 `@鈴奈咲桜`、`@Hakutyan_bai`

---
### 🎯 我的身份

✍️ 一名中国[🇨🇳]**<span  style="color:#6b66cc; "> 学生 </span>**  
🍻 一名普通的**BiliBili UP主**   
🛠️ **Minecraft 玩家**   

---
### 🚀 目前重心

⚡ **正在学:** C# | Unity<br>
📚 **计划学:** JAVA | 前端框架 (Vue)  

---
### ❤️ 我的兴趣

🌐 **语言:** 日本语<br>
🎮 **游戏:** Minecraft<br>
🤖 **技术宅:** DIY硬件项目 | 服务器



---
### 📝 愿望清单
🕶️ Meta Quest 3  
💽 NVIDIA RTX 5060

---
### 🌐 使用语言
- [🇨🇳] **中文**
- [🇯🇵] 日语 



### ✉️ 联系我
- 点击页面 ◀️左侧 或 🔽下方 的 **Email**按钮
- [yukikohk@163.com](mail:yukikohk@163.com)


---

  </div>
  
  <div id="jp-section" class="language-section">
    
<br/>     

# 🌱 自己紹介  

## 👋 こんにちは、私は `@鈴奈咲桜`、`@Hakutyan_bai`です  

---  
### 🎯 プロフィール  

✍️ 中国[🇨🇳]<span style="color:#6b66cc;"> **学生** </span>  
🍻 普通の**BiliBili UP主**  
🛠️ **普通のマインクラフトプレイヤー**  

---  
### 🚀 現在の活動  

⚡ **習得済み:** C# | Unity<br>
📚 **学習予定:** JAVA | 前端框架 (Vue)  

---  
### ❤️ 趣味  

🌐 **言語:** 日本語 <br>
🎮 **ゲーム:** マインクラフト<br>
🤖 **技術オタク:** 自作ハードウェアプロジェクト | サーバー



---  
### 📝 欲しいものリスト  
🕶️ Meta Quest 3  
💽 NVIDIA RTX 5060

---  
### 🌐 使用言語  
- [🇨🇳] **中国語**  
- [🇯🇵] 日本語 



---  
### ✉️ 連絡先  
- ページの◀️左側 または 🔽下部 の **メールボタン** をクリック  
- [yukikohk@163.com](mail:yukikohk@163.com)
  </div>
</div>

<script>
function switchLanguage(lang) {
    const container = document.querySelector('.language-container');
    const sections = container.querySelectorAll('.language-section');
    const newActive = document.getElementById(`${lang}-section`);
    
    if (!newActive) return;

    // 获取当前激活的部分
    const currentActive = container.querySelector('.language-section.active');
    
    if (currentActive) {
        // 淡出当前内容
        currentActive.style.opacity = '0';
        currentActive.style.transform = 'translateY(20px)';
        
        // 等待淡出动画完成后再切换
        setTimeout(() => {
            currentActive.classList.remove('active');
            
            // 准备新内容
            newActive.style.opacity = '0';
            newActive.style.transform = 'translateY(20px)';
            newActive.classList.add('active');
            
            // 触发重排以启动动画
            void newActive.offsetWidth;
            
            // 淡入新内容
            newActive.style.opacity = '1';
            newActive.style.transform = 'translateY(0)';
            
            // 调整容器高度
            container.style.height = `${newActive.scrollHeight}px`;
            
            setTimeout(() => {
                container.style.height = 'auto';
            }, 300);
        }, 300);
    } else {
        // 首次加载直接显示
        newActive.classList.add('active');
        newActive.style.opacity = '1';
        newActive.style.transform = 'translateY(0)';
    }
}

// 页面加载时默认显示英文
document.addEventListener('DOMContentLoaded', function() {
    switchLanguage('zh');
});
</script>