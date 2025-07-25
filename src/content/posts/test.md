---  
title: '[Fuwari]链接卡片功能示例'  
published: 2025-02-23T00:00:00+00:00
updated: 2025-02-23  
description: 链接卡片功能使用指南  
tags: [Markdown, 博客, 演示]  
category: 示例  
series: Fuwari
draft: false  
---  

## 关于链接卡片  

链接卡片类似于 [Starlight](https://starlight.astro.build) 中的 `<LinkCard>` 组件，以卡片形式展示链接。  

## 使用方法  

在 Markdown 段落中仅包含单个"裸链接"（无描述文本的链接）即可自动转换为链接卡片。  

```markdown  
**外部链接**  

https://astro.build/  

<https://github.com/saicaca/fuwari/>  

[https://fuwari.vercel.app/](https://fuwari.vercel.app/)  

**内部链接**  

[/posts/guide/](/posts/guide/)  

更多细节请参阅 internalLink 配置项说明。  

**国际化域名 (IDN)**  

https://はじめよう.みんな/  
```  

https://astro.build/  

<https://github.com/saicaca/fuwari/>  

[https://fuwari.vercel.app/](https://fuwari.vercel.app/)  

[/posts/guide/](/posts/guide/)  

https://はじめよう.みんな/  

> [!NOTE]
> 卡片显示后，可尝试切换主题颜色或开启暗黑模式！  

## 配置选项  

在 `astro.config.mjs` 文件中进行配置：  

```javascript  
...  
import fuwariLinkCard from "./src/plugins/fuwari-link-card.js"  
...  
export default defineConfig({  
  ...  
  integrations: [  
    ...  
    fuwariLinkCard(), // 插件在此处  
    ...  
```  
若插件顺序复杂，可指定为 remark 插件：  
```javascript  
...  
import remarkLinkCard from "./src/plugins/remark-link-card.js"  
...  
export default defineConfig({  
  ...  
  markdown: {  
    ...  
    remarkPlugins: [  
      ...  
      remarkLinkCard, // 插件在此处  
      ...  
```  

| 名称             | 类型            | 默认值                                                                                                                                    | 说明                                                                                                                                                                                                 |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `devMode`        | boolean         | [import.meta.env.DEV](https://docs.astro.build/zh-cn/guides/environment-variables/#默认环境变量 "默认环境变量")                          | 启用/禁用开发模式                                                                                                                                                                                  |
| `linkAttributes` | Object          | { target: '', rel: '' }                                                                                                                 | 设置外部链接的 target 和 rel 属性。留空可交由其他插件处理                                                                                                                                           |
| `rewriteRules`   | Array\<Object\> | []                                                                                                                                      | 重写从链接获取的元数据（如标题和描述）                                                                                                                                                             |
| `base`           | string          | '/'                                                                                                                                     | 指定与 Astro 相同的 base 路径。[详见文档](https://docs.astro.build/zh-cn/reference/configuration-reference/#base "配置参考")。**作为集成插件使用时，若未指定将自动获取**                            |
| `defaultThumbnail` | string        | ''                                                                                                                                      | 元数据无图片时的默认缩略图路径（相对于 public 目录）。例如：'images/default-thumbnail.jpg' 对应 public/images/default-thumbnail.jpg                                                                |
| `internalLink`   | Object          | { enabled: false, site: '' }                                                                                                            | 启用站内链接处理                                                                                                                                                                                   |
| `cache`          | Object          | 详见下方详细选项                                                                                                                        | 构建时下载并缓存图片                                                                                                                                                                               |

### linkAttributes  
| 名称   | 类型   | 默认值 | 说明                                                                 |
| ------ | ------ | ------ | -------------------------------------------------------------------- |
| `target` | string | ''     | 指定链接打开方式（如 _blank）。留空则不设置                          |
| `rel`    | string | ''     | 定义当前文档与链接文档的关系。留空则不设置                           |

### rewriteRules  
| 名称         | 类型            | 默认值 | 说明                                                                 |
| ------------ | --------------- | ------ | -------------------------------------------------------------------- |
| `url`        | RegExp          |        | 用于匹配特定 URL 的正则表达式                                        |
| `rewriteSteps` | Array\<Object\> |        | 定义元数据属性的重写规则                                             |

以下示例演示如何重写 GitHub 仓库链接的标题和描述：  
```javascript  
rewriteRules: [  
  {  
    url: /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/,  
    rewriteSteps: [  
      { key: "title", pattern: /:.*/, replacement: "" },  
      {  
        key: "description",  
        pattern: /(?: (?:\. )?Contribute to (?:.+\/.+) .+\.?)|(?: - (?:.+\/.+))$/,  
        replacement: "",  
      },  
      {  
        key: "description",  
        pattern: /^Contribute to (?:.+\/.+) .+\.?$/,  
        replacement: "未提供描述。",  
      },  
    ],  
  },  
],  
```  

| 名称        | 类型   | 默认值 | 说明                                                                 |
| ----------- | ------ | ------ | -------------------------------------------------------------------- |
| `key`       | string |        | 需重写的元数据属性名                                                 |
| `pattern`   | RegExp |        | 匹配元数据值的正则表达式                                             |
| `replacement` | string |        | 替换匹配内容的字符串                                                 |

### internalLink  
设置 `enabled` 为 `true` 启用站内链接处理。`site` 和 `base` 选项将内部链接解析为绝对 URL。**链接必须指向服务器存在的文件**  
| 名称    | 类型    | 默认值 | 说明                                                                                                                               |
| ------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `enabled` | boolean | false  | 启用/禁用站内链接处理                                                                                                             |
| `site`    | string  | ''     | 指定与 Astro 相同的部署 URL。[详见文档](https://docs.astro.build/zh-cn/reference/configuration-reference/#site "配置参考")。**作为集成插件使用时，若未指定将自动获取** |

### cache  
以下选项用于控制缓存行为：  
| 名称         | 类型    | 默认值                                                                                                       | 说明                                                                                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `enabled`      | boolean | false                                                                                                       | 启用/禁用缓存                                                                                                                              |
| `outDir`       | string  | './dist/'                                                                                                   | 输出目录路径。[详见文档](https://docs.astro.build/zh-cn/reference/configuration-reference/#outdir "配置参考")。与 Astro 对齐可享受图片优化等功能 |
| `cacheDir`     | string  | './link-card/'                                                                                              | 缓存目录路径。开发模式下最终图片路径为 `base + outDir + cacheDir`，否则为 `base + cacheDir`                                                 |
| `maxFileSize`  | number  | 0                                                                                                           | 单文件最大缓存大小（字节），0 表示无限制                                                                                                   |
| `maxCacheSize` | number  | 0                                                                                                           | 总缓存大小限制（字节），0 表示无限制                                                                                                       |
| `userAgent`    | string  | 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36' | HTTP 请求头中的客户端标识                                                                                                                 |

### 快速配置  
本插件使用 `@fastify/deepmerge` 简化配置合并：  
<https://www.npmjs.com/package/@fastify/deepmerge>  

## 样式 HTML 结构  
样式定义在 `src/styles/link-card.css`，自动生成的 HTML 结构如下（供自定义样式参考）：  
```html  
<div class="link-card__container">  
  <a href="https://astro.build/" class="link-card">  
    <div class="link-card__info">  
      <div class="link-card__title">Astro</div>  
      <div class="link-card__description">Astro 可构建快速内容站点、强大的 Web 应用、动态服务 API 等。</div>  
      <div class="link-card__metadata">  
        <div class="link-card__domain">  
          <img alt="favicon" class="link-card__favicon" src="https://www.google.com/s2/favicons?domain=astro.build">  
          <span class="link-card__domain-name">astro.build</span>  
        </div>  
      </div>  
    </div>  
    <div class="link-card__thumbnail">  
      <img alt="Astro - 构建你想要的 Web" class="link-card__image" src="https://astro.build/og/astro.jpg">  
    </div>  
  </a>  
</div>  
```  