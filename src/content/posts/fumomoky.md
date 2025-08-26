---
title: "Fumomo 部署教程！！！"
description: "Fumomo是一款可爱的个人主页模板！使用Nuxt架构，本篇博客会将Fumomo托管到Vercel。"
published: 2025-08-26
updated: 2025-08-26 12:00:00
tags: [个人主页,教程]
category: "个人主页"
image: ""
series: Fumomo个人主页
---
# 事先准备

1. 一个善于思考问题脑子，最好是多核心的那种，并且遇到问题会自己先思考

2. 一个[Github](https://github.com)账号

3. [Git - Downloads (git-scm.com)](https://git-scm.com/downloads)：提交代码用的

4. [Node.js — Run JavaScript Everywhere (nodejs.org)](https://nodejs.org/en)：Fumomo基于Node.js，你一定要安装这个

5. 一个[Vercel](https://vercel.com)账号：用于托管

6. 一个编辑器，比如VSCode


# 流程图

本地预览与修改 -> 推送更改到远程Github仓库 -> Vercel检测到仓库更新自动构建新的网站静态文件 -> 网站成功更改

# 本地部署教程
1. 下载源代码！

https://github.com/Hakutyan-bai/Fumomo-nuxt

2. 进入目录并且安装依赖
```
cd Fumomo-nuxt

#全局安装pnpm，装过的可以不装
npm install -g pnpm

#安装项目依赖
pnpm i
```
3. 启动项目
```
#启动项目dev环境
pnpm dev
```
4. 在浏览器输入控制台输出的网址即可预览

## 修改基本信息
在"fumomo-nuxt/app/config"有一个"index.ts"文件，这里控制着个人主页的基本信息,也写了较为详细的注释

```ts title="app/config/index.ts"
// ========================================
//  Fumomo 网站配置文件
// ========================================
// 
// 这个文件包含了网站的所有配置信息。你可以通过修改这些值来：
// 更改网站标题和描述
// 设置文章RSS订阅地址  
// 自定义首页内容和介绍
// 修改个人信息和社交链接
// 调整主题色彩和样式
//
// 修改后保存文件，网站会自动更新！
// ========================================

// 网站配置文件 - 集中管理所有网站设置
export const siteConfig = {
  // ========================================
  // 🌟 核心网站设置 - 最重要的配置
  // ========================================
  site: {
    // 网站标题 - 显示在浏览器标签页和导航栏
    title: "Haku Fumomo-Nuxt",
    
    // 网站副标题 - 显示在首页标题下方
    subtitle: "你好，欢迎来到Haku的个人主页Fumomo！",
    
    // 网站描述 - 用于SEO和社交媒体分享
    description: "欢迎来到Haku Fumomo的温柔世界，在这里分享技术、生活和思考",

    // 网站URL - 完整的域名地址
    url: "https://haku.sakura.ink",
    
  },

  // ========================================
  // 文章设置 - 配置文章来源
  // ！！！如果要订阅文章请在server/api/rss.get.ts中修改订阅链接！！！
  // ========================================
  articles: {

    
    // 文章页面标题
    pageTitle: "我的文章",
    
    // 文章页面描述
    pageDescription: "技术分享与生活感悟",
    
    // 每页显示文章数量
    postsPerPage: 10,
    
    // 文章来源说明
    sourceDescription: "文章内容来自我的博客"
  },

  // ========================================
  // 首页内容设置 - 自定义首页展示
  // ========================================
  home: {
    // 主标题（通常使用site.title）
    mainTitle: "Fumomo",
    
    // 欢迎语句
    welcomeText: "一个充满温暖与创意的小窝",
    
    // 首页特色介绍卡片 - 可以自由修改图标、标题和描述
    features: [
      {
        title: "技术分享",
        description: "分享编程技巧、框架使用心得和技术思考"
      },
      {
        title: "生活记录", 
        description: "记录日常生活中的美好瞬间和感悟"
      },
      {
        title: "创意项目",
        description: "展示个人项目和创意作品"
      }
    ]
  },

  // ========================================
  // 页面配置
  // ========================================
  pages: {
    home: {
      title: "首页",
    },
    articles: {
      title: "我的文章",
      description: "技术分享与生活感悟"
    },
    about: {
      title: "关于",
    },
    projects: {
      title: "项目作品",
      description: "我的一些项目作品"
    },
    website: {
      title: "我的网站",
      description: "正在运行的网站信息"
    }
  },

  // ========================================
  // 个人信息设置
  // ========================================
  personal: {
    // 基本信息
    name: "Haku",
    bio: "平时喜欢整点新奇玩意，喜欢做点小项目。",
    hobby: "编程开发、网页设计",
    location: "广东深圳",
    learning: "Astro、VUE、C#",
    avatar: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
    
    // 关于页面社交媒体链接
    social: {
      github: "https://github.com/Hakutyan-bai",
      email: "lzj159035@foxmail.com"
    }
  },

  // ========================================
  // 网站UI设置
  // ========================================
  

  // 导航菜单
  navigation: [
    { name: "首页", href: "/", key: "home"},
    { name: "文章", href: "/articles", key: "articles"},
    { name: "关于", href: "/about", key: "about"},
    { name: "项目", href: "/projects", key: "projects"},
    { name: "网站", href: "/website", key: "website"}
  ],

  // 主题配置
  theme: {
    primaryColor: "#8b5a8c",
    secondaryColor: "#f0f9ff", 
    accentColor: "#ffeef8",
    textColor: "#666",
    fontFamily: "'Comic Sans MS', 'XiaokeNailao', cursive, sans-serif"
  },

  // ========================================
  // Umami统计配置 - 记得在layout插入Umami的脚本
  // ========================================
  umami: {
    enable: false, // 是否显示umami统计
    shareId: "VAARDWeRY31dw6ug", // 填入共享URL最后面那一串  比如：https://eu.umami.is/api/share/2dKQ5T0WrUn6AYtr 你就填入2dKQ5T0WrUn6AYtr
    region: "eu", // Umami有两个区域，按需选择即可  比如：https://eu.umami.is 你就填入eu
  },
};

// ========================================
// 类型定义和辅助函数
// ========================================

// 页面类型定义
export type PageKey = keyof typeof siteConfig.pages;

// 获取页面配置的辅助函数
export function getPageConfig(pageKey: PageKey) {
  return siteConfig.pages[pageKey];
}

// 获取页面标题的辅助函数
export function getPageTitle(pageKey: PageKey) {
  return siteConfig.pages[pageKey].title;
}

// 获取社交媒体链接的辅助函数
export function getSocialLinks() {
  return Object.entries(siteConfig.personal.social).map(([platform, url]) => ({
    platform,
    url,
    name: platform.charAt(0).toUpperCase() + platform.slice(1)
  }));
}

// 获取网站完整标题的辅助函数
export function getFullTitle(pageTitle?: string) {
  return pageTitle ? `${pageTitle} - ${siteConfig.site.title}` : siteConfig.site.title;
}

```

## 文章订阅
修改高亮部分内代码
```ts title="server/api/rss.get.ts" {20,26}
import { XMLParser } from 'fast-xml-parser'

export interface RSSItem {
  title: string
  link: string
  pubDate: string
  description: string
  guid?: string
}

export interface RSSResponse {
  items: RSSItem[]
  total: number
  error?: string
}

export default defineEventHandler(async (event): Promise<RSSResponse> => {
  try {
    // 从配置中获取 RSS URL
    const rssUrl = 'https://blog.sakura.ink/rss.xml'//自定义文章的RSS地址
    
    // 获取 RSS 数据，设置超时和重试
    const response = await $fetch<string>(rssUrl, {
      timeout: 10000, // 10秒超时
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Nuxt RSS Reader; +https://haku.sakura.ink)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    })

    // 解析 XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: false,
      parseAttributeValue: false,
      trimValues: true,
      processEntities: true
    })

    const result = parser.parse(response)
    
    // 提取文章数据
    let items: RSSItem[] = []
    
    if (result.rss && result.rss.channel && result.rss.channel.item) {
      const rssItems = Array.isArray(result.rss.channel.item) 
        ? result.rss.channel.item 
        : [result.rss.channel.item]
      
      items = rssItems.map((item: any) => {
        // 清理描述内容，移除HTML标签
        let description = item.description || item['content:encoded'] || '暂无描述'
        if (typeof description === 'string') {
          description = description
            .replace(/<[^>]*>/g, '') // 移除HTML标签
            .replace(/&nbsp;/g, ' ') // 替换空格实体
            .replace(/&amp;/g, '&')  // 替换&实体
            .replace(/&lt;/g, '<')   // 替换<实体
            .replace(/&gt;/g, '>')   // 替换>实体
            .trim()
            .substring(0, 200) // 限制长度
        }
        
        return {
          title: item.title || '无标题',
          link: item.link || '#',
          pubDate: item.pubDate || new Date().toISOString(),
          description,
          guid: item.guid?.['#text'] || item.guid || item.link
        }
      })
      
      // 按日期排序，最新的在前
      items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    }

    return {
      items,
      total: items.length
    }

  } catch (error) {
    console.error('RSS 获取失败:', error)
    
    return {
      items: [],
      total: 0,
      error: `RSS 获取失败: ${error instanceof Error ? error.message : '未知错误'}`
    }
  }
})

```

## 我的项目&我的网站

在app/pages目录下，分别是website.vue和projects.vue

## 我的历程&个人履历

在app/components目录下，分别是Myjourney.vue和Qualification.vue

## 本地预览，然后发布到Github

1. 当你认为你修改得差不多时，想要看看效果？请到项目根目录执行：`pnpm dev`，稍等片刻，你就可以本地预览你的个人主页啦!

2. 接下来我们要用Git将我们所做的更改发布到Github
   
   - 首先，你需要让Git知道你是谁：`git config --global user.name "你的Github用户名"`和`git config --global user.email "你的Github邮箱@example.com"`
   
   - 然后，更改远程仓库为ssh*（如果是通过ssh克隆的不用改）：`git remote set-url origin git@github.com:xxx/xxx`
   
   - 随后，让我们提交所有文件：`git add .`
   
   - 之后，让我们发布一个本地提交：`git commit -m "项目初始化"`
   
   - 最后，让我们将本地更改提交到远程仓库：`git push`



# 发布到Vercel
1. 将GitHub仓库连接至Vercel
2. 点击新建一个项目
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANJaK04rKBgNazbfboKRxpcU9xXXi0AAlDIMRtJoWlVugqS4a_KlagBAAMCAAN3AAM2BA.png">

3. 选择你的Github仓库
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANLaK04saKilAs3HgOJ0XlgsURtKiwAAlLIMRtJoWlVCnBRTxx3bgcBAAMCAAN3AAM2BA.png">

4. 按需修改仓库名然后部署
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANIaK04rJ1lJEmji1pM0hBekB6eKN4AAk_IMRtJoWlVU668aJJTJlcBAAMCAAN3AAM2BA.png">

5. 部署完毕（首次部署可能会有点慢）
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANMaK04svbRp58RG5fP6OiaJd9CCyEAAlPIMRtJoWlVeJskODy49KoBAAMCAAN3AAM2BA.png">

6. 设置自定义域名
<img src="https://img.sakura.ink/file/AgACAgUAAyEGAASIHQfFAANKaK04rf3DoB5YJ2UAAajXB7okUajYAAJRyDEbSaFpVUVZgAUtfhdeAQADAgADdwADNgQ.png">


## 如果部署到Vercel后有想要修改的内容怎么办？

1. 正常修改内容并保存
2. 提交所有文件：`git add .`
3. 发布一个本地提交：`git commit -m "修改内容"`
4. 更改提交到远程仓库：`git push`
5. 等待Vercel自动重新部署即可

---

文章编辑：`@鈴奈咲桜`