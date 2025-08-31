---
title: 生成短链接
published: 2025-07-26
description: ''
image: ''
tags: [JS,CloudFlare Workers]
category: '教程'
draft: false 
lang: ''
updated: 2025-08-31 20:00:00
series: CloudFlare
---

这是一个生成短链接的项目，本来有视频教程的，b站发不了，可恶啊

# 事前准备

你需要将域名托管至Cloudflare，用于绑定Workers

# 第一步 新建CloudFlare Workers

在Workers粘贴以下代码

:::note
修改第八行的your_admin_password_here为你自己的密码
:::

```js title="Workers.js"  {8}
// Cloudflare Workers 短网址服务
// 支持后台管理和在线添加/编辑功能

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 管理员密码 - 从环境变量获取，提高安全性
    const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'Fuwarisl123';

    // 处理管理后台
    if (path === '/admin' || path === '/admin/') {
      return handleAdmin(request, env, ADMIN_PASSWORD);
    }

    // 处理 API 请求
    if (path.startsWith('/api/')) {
      return handleAPI(request, env, ADMIN_PASSWORD);
    }

    // 处理短链跳转
    if (path !== '/' && path !== '/favicon.ico') {
      return handleRedirect(request, env);
    }

    // 主页
    return new Response(getHomePage(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

// 处理管理后台
async function handleAdmin(request, env, adminPassword) {
  const url = new URL(request.url);
  
  // 检查认证
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !isValidAuth(authHeader, adminPassword)) {
    return new Response('', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
        'Content-Type': 'text/html'
      }
    });
  }

  return new Response(getAdminPage(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// 处理 API 请求
async function handleAPI(request, env, adminPassword) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 检查认证
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !isValidAuth(authHeader, adminPassword)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (path === '/api/urls' && request.method === 'GET') {
      // 获取所有短链
      const urls = await getAllUrls(env);
      return new Response(JSON.stringify(urls), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/urls' && request.method === 'POST') {
      // 创建短链
      const data = await request.json();
      const result = await createShortUrl(env, data.originalUrl, data.customCode, request);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/urls/') && request.method === 'DELETE') {
      // 删除短链
      const code = path.split('/').pop();
      await deleteUrl(env, code);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/urls/') && request.method === 'PUT') {
      // 更新短链
      const code = path.split('/').pop();
      const data = await request.json();
      const result = await updateUrl(env, code, data.originalUrl);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/stats/') && request.method === 'GET') {
      // 获取点击统计
      const code = path.split('/').pop();
      const stats = await getUrlStats(env, code);
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' }
  });
}

// 处理短链跳转
async function handleRedirect(request, env) {
  const url = new URL(request.url);
  const code = url.pathname.slice(1); // 移除开头的 /

  if (!code) {
    return new Response('Not found', { status: 404 });
  }

  try {
    // 获取原始 URL
    const urlData = await env.URL_SHORTENER.get(`url:${code}`, 'json');
    
    if (!urlData) {
      return new Response('Short URL not found', { status: 404 });
    }

    // 更新点击统计
    await updateClickStats(env, code);

    // 重定向到原始 URL
    return Response.redirect(urlData.originalUrl, 302);
    
  } catch (error) {
    return new Response('Error processing request', { status: 500 });
  }
}

// 生成随机短码
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 创建短链
async function createShortUrl(env, originalUrl, customCode = null, request) {
  // 验证 URL
  try {
    new URL(originalUrl);
  } catch {
    throw new Error('Invalid URL');
  }

  let shortCode = customCode;
  
  // 如果没有自定义代码，生成随机代码
  if (!shortCode) {
    do {
      shortCode = generateShortCode();
    } while (await env.URL_SHORTENER.get(`url:${shortCode}`));
  } else {
    // 检查自定义代码是否已存在
    const existing = await env.URL_SHORTENER.get(`url:${shortCode}`);
    if (existing) {
      throw new Error('Custom code already exists');
    }
  }

  const urlData = {
    originalUrl,
    shortCode,
    createdAt: new Date().toISOString(),
    clicks: 0
  };

  // 保存到 KV 存储
  await env.URL_SHORTENER.put(`url:${shortCode}`, JSON.stringify(urlData));
  
  // 添加到索引列表
  const urlList = await env.URL_SHORTENER.get('url_list', 'json') || [];
  urlList.push(shortCode);
  await env.URL_SHORTENER.put('url_list', JSON.stringify(urlList));

  // 获取当前域名
  const origin = request ? new URL(request.url).origin : 'https://your-domain.com';

  return {
    shortCode,
    shortUrl: `${origin}/${shortCode}`,
    originalUrl,
    createdAt: urlData.createdAt
  };
}

// 获取所有短链
async function getAllUrls(env) {
  const urlList = await env.URL_SHORTENER.get('url_list', 'json') || [];
  const urls = [];

  for (const code of urlList) {
    const urlData = await env.URL_SHORTENER.get(`url:${code}`, 'json');
    if (urlData) {
      urls.push(urlData);
    }
  }

  return urls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// 删除短链
async function deleteUrl(env, code) {
  await env.URL_SHORTENER.delete(`url:${code}`);
  
  // 从索引列表中移除
  const urlList = await env.URL_SHORTENER.get('url_list', 'json') || [];
  const updatedList = urlList.filter(c => c !== code);
  await env.URL_SHORTENER.put('url_list', JSON.stringify(updatedList));
}

// 更新短链
async function updateUrl(env, code, newUrl) {
  const urlData = await env.URL_SHORTENER.get(`url:${code}`, 'json');
  if (!urlData) {
    throw new Error('URL not found');
  }

  // 验证新 URL
  try {
    new URL(newUrl);
  } catch {
    throw new Error('Invalid URL');
  }

  urlData.originalUrl = newUrl;
  urlData.updatedAt = new Date().toISOString();

  await env.URL_SHORTENER.put(`url:${code}`, JSON.stringify(urlData));
  return urlData;
}

// 更新点击统计
async function updateClickStats(env, code) {
  const urlData = await env.URL_SHORTENER.get(`url:${code}`, 'json');
  if (urlData) {
    urlData.clicks = (urlData.clicks || 0) + 1;
    urlData.lastClicked = new Date().toISOString();
    await env.URL_SHORTENER.put(`url:${code}`, JSON.stringify(urlData));
  }
}

// 获取统计信息
async function getUrlStats(env, code) {
  const urlData = await env.URL_SHORTENER.get(`url:${code}`, 'json');
  return urlData ? {
    clicks: urlData.clicks || 0,
    lastClicked: urlData.lastClicked,
    createdAt: urlData.createdAt
  } : null;
}

// 验证认证
function isValidAuth(authHeader, password) {
  const credentials = authHeader.replace('Basic ', '');
  const decoded = atob(credentials);
  const [username, pass] = decoded.split(':');
  return pass === password;
}

// 主页 HTML
function getHomePage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>短网址服务</title>
    <style>
        :root {
            --primary: #0cffe1;
            --secondary: #5271ff;
            --accent: #ff2a6d;
            --dark: #0a1128;
            --darker: #050a1d;
            --light: #d0fef5;
            --card-bg: rgba(16, 18, 46, 0.7);
            --glow: 0 0 10px var(--primary), 0 0 20px rgba(12, 255, 225, 0.3);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: var(--darker);
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(18, 44, 120, 0.5) 0%, transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(82, 113, 255, 0.4) 0%, transparent 25%),
                radial-gradient(circle at 50% 80%, rgba(255, 42, 109, 0.3) 0%, transparent 25%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .cyber-border {
            position: relative;
            border: 1px solid var(--primary);
            box-shadow: var(--glow);
            border-radius: 15px;
            background: var(--card-bg);
            overflow: hidden;
            backdrop-filter: blur(10px);
            width: 100%;
            max-width: 700px;
        }
        
        .cyber-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 6px;
            height: 6px;
            border-top: 2px solid var(--primary);
            border-left: 2px solid var(--primary);
            box-shadow: var(--glow);
        }
        
        .cyber-border::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 6px;
            height: 6px;
            border-bottom: 2px solid var(--primary);
            border-right: 2px solid var(--primary);
            box-shadow: var(--glow);
        }
        
        .container {
            padding: 50px 40px;
        }
        
        h1 {
            text-align: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 3em;
            font-weight: 700;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 15px rgba(12, 255, 225, 0.5);
            margin-bottom: 20px;
            letter-spacing: 1px;
        }
        
        .subtitle {
            text-align: center;
            color: var(--light);
            margin-bottom: 50px;
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-top: 50px;
        }
        
        .feature {
            padding: 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            text-align: center;
            border: 1px solid rgba(12, 255, 225, 0.2);
            transition: all 0.3s ease;
        }
        
        .feature:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(12, 255, 225, 0.2);
            background: rgba(255, 255, 255, 0.08);
        }
        
        .feature h3 {
            color: var(--primary);
            margin-bottom: 15px;
            font-family: 'Orbitron', sans-serif;
            font-size: 1.4em;
        }
        
        .feature p {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
        }
        
        .admin-link {
            display: block;
            text-align: center;
            margin-top: 50px;
            padding: 18px 40px;
            background: linear-gradient(45deg, var(--secondary), var(--primary));
            color: var(--darker);
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .admin-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            transition: all 0.4s ease;
            z-index: -1;
        }
        
        .admin-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(12, 255, 225, 0.4);
        }
        
        .admin-link:hover::before {
            left: 0;
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(12, 255, 225, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(12, 255, 225, 0); }
            100% { box-shadow: 0 0 0 0 rgba(12, 255, 225, 0); }
        }
        
        .cyber-line {
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            margin: 30px 0;
            opacity: 0.5;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2.2em;
            }
            
            .container {
                padding: 30px 20px;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
        
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            background: var(--primary);
            border-radius: 50%;
            opacity: 0.3;
            animation: float 15s infinite linear;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(100vw);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔗 短网址服务</h1>
        <p class="subtitle">快速、安全、可靠的短链接服务</p>
        
        <div class="features">
            <div class="feature">
                <h3>⚡ 快速访问</h3>
                <p>基于 Cloudflare Workers，全球边缘节点加速</p>
            </div>
            <div class="feature">
                <h3>📊 数据统计</h3>
                <p>实时统计点击量和访问数据</p>
            </div>
            <div class="feature">
                <h3>🛡️ 安全可靠</h3>
                <p>支持自定义短码，安全的管理后台</p>
            </div>
            <div class="feature">
                <h3>🎨 在线管理</h3>
                <p>可视化后台，轻松管理所有短链接</p>
            </div>
        </div>
        
        <a href="/admin" class="admin-link">进入管理后台</a>
    </div>

</body>
</html>`;
}

// 管理后台 HTML
function getAdminPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>短网址管理后台</title>
    <style>
        :root {
            --primary: #0cffe1;
            --secondary: #5271ff;
            --accent: #ff2a6d;
            --dark: #0a1128;
            --darker: #050a1d;
            --light: #d0fef5;
            --card-bg: rgba(16, 18, 46, 0.7);
            --glow: 0 0 10px var(--primary), 0 0 20px rgba(12, 255, 225, 0.3);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: var(--darker);
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(18, 44, 120, 0.5) 0%, transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(82, 113, 255, 0.4) 0%, transparent 25%),
                radial-gradient(circle at 50% 80%, rgba(255, 42, 109, 0.3) 0%, transparent 25%);
            color: #fff;
            min-height: 100vh;
            line-height: 1.6;
        }
        
        .cyber-border {
            position: relative;
            border: 1px solid var(--primary);
            box-shadow: var(--glow);
            border-radius: 8px;
            background: var(--card-bg);
            overflow: hidden;
        }
        
        .cyber-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 4px;
            border-top: 2px solid var(--primary);
            border-left: 2px solid var(--primary);
            box-shadow: var(--glow);
        }
        
        .cyber-border::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 4px;
            height: 4px;
            border-bottom: 2px solid var(--primary);
            border-right: 2px solid var(--primary);
            box-shadow: var(--glow);
        }
        
        .header {
            background: rgba(10, 17, 40, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(12, 255, 225, 0.3);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .header h1 {
            font-family: 'Orbitron', sans-serif;
            text-align: center;
            font-weight: 700;
            font-size: 2.5em;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 15px rgba(12, 255, 225, 0.5);
            letter-spacing: 1px;
        }
        
        .main {
            padding: 40px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .create-form {
            padding: 30px;
            margin-bottom: 40px;
            backdrop-filter: blur(5px);
        }
        
        .create-form h2 {
            margin-bottom: 25px; 
            color: var(--primary); 
            font-family: 'Orbitron', sans-serif;
        }
        
        .form-group {
            margin-bottom: 25px;
            position: relative;
        }
        
        label {
            display: block;
            margin-bottom: 12px;
            font-weight: 500;
            color: var(--light);
            font-size: 1.1em;
        }
        
        input[type="url"], input[type="text"] {
            width: 100%;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(12, 255, 225, 0.3);
            border-radius: 6px;
            font-size: 16px;
            color: white;
            transition: all 0.3s ease;
        }
        
        input[type="url"]:focus, input[type="text"]:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: var(--glow);
            background: rgba(255, 255, 255, 0.12);
        }
        
        .btn {
            background: linear-gradient(45deg, var(--secondary), var(--primary));
            color: var(--darker);
            padding: 14px 30px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            transition: all 0.4s ease;
            z-index: -1;
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(12, 255, 225, 0.4);
        }
        
        .btn:hover::before {
            left: 0;
        }
        
        .btn-small {
            padding: 8px 16px;
            font-size: 14px;
            margin: 0 5px;
        }
        
        .btn-danger {
            background: linear-gradient(45deg, #ff2a6d, #ff5e00);
        }
        
        .btn-info {
            background: linear-gradient(45deg, #5271ff, #8c52ff);
        }
        
        .urls-list {
            overflow: hidden;
        }
        
        .urls-header {
            padding: 25px 30px;
            border-bottom: 1px solid rgba(12, 255, 225, 0.3);
        }
        
        .urls-header h2 {
            color: var(--primary);
            font-weight: 500;
            font-family: 'Orbitron', sans-serif;
            font-size: 1.8em;
        }
        
        .url-item {
            padding: 25px 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .url-item:hover {
            background: rgba(12, 255, 225, 0.05);
        }
        
        .url-item:last-child {
            border-bottom: none;
        }
        
        .url-info {
            margin-bottom: 15px;
        }
        
        .short-url {
            font-weight: 600;
            color: var(--primary);
            font-size: 1.3em;
            font-family: 'Orbitron', sans-serif;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .original-url {
            color: rgba(255, 255, 255, 0.7);
            margin: 10px 0;
            word-break: break-all;
            font-size: 0.95em;
        }
        
        .url-meta {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 15px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .url-actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .stats {
            display: inline-flex;
            align-items: center;
            background: rgba(12, 255, 225, 0.1);
            color: var(--primary);
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid rgba(12, 255, 225, 0.2);
        }
        
        .loading {
            text-align: center;
            padding: 50px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.2em;
        }
        
        .error {
            background: rgba(255, 42, 109, 0.15);
            color: #ff2a6d;
            padding: 12px 18px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid rgba(255, 42, 109, 0.3);
        }
        
        .success {
            background: rgba(12, 255, 225, 0.15);
            color: var(--primary);
            padding: 12px 18px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid rgba(12, 255, 225, 0.3);
        }
        
        .copy-btn {
            background: rgba(12, 255, 225, 0.2);
            color: var(--primary);
            border: 1px solid var(--primary);
            font-size: 12px;
            padding: 6px 12px;
            margin-left: 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .copy-btn:hover {
            background: rgba(12, 255, 225, 0.3);
            box-shadow: 0 0 8px var(--primary);
        }
        
        @media (max-width: 768px) {
            .url-actions {
                flex-direction: column;
            }
            
            .btn-small {
                margin: 5px 0;
            }
            
            .url-meta {
                flex-direction: column;
                gap: 8px;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
        
        .cyber-loader {
            width: 40px;
            height: 40px;
            margin: 0 auto;
            border: 3px solid var(--primary);
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
            box-shadow: 0 0 10px var(--primary);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(12, 255, 225, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(12, 255, 225, 0); }
            100% { box-shadow: 0 0 0 0 rgba(12, 255, 225, 0); }
        }
        
        .cyber-line {
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--primary), transparent);
            margin: 15px 0;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>🔗 短网址管理后台</h1>
        </div>
    </div>

    <div class="main">
        <!-- 创建短链表单 -->
        <div class="create-form">
            <h2 style="margin-bottom: 20px; color: #333;">创建新的短链接</h2>
            <div id="message"></div>
            <form id="createForm">
                <div class="form-group">
                    <label for="originalUrl">原始网址 *</label>
                    <input type="url" id="originalUrl" placeholder="https://example.com" required>
                </div>
                <div class="form-group">
                    <label for="customCode">自定义短码 (可选)</label>
                    <input type="text" id="customCode" placeholder="留空则自动生成">
                </div>
                <button type="submit" class="btn">创建短链接</button>
            </form>
        </div>

        <!-- 短链列表 -->
        <div class="urls-list">
            <div class="urls-header">
                <h2>所有短链接</h2>
            </div>
            <div id="urlsList">
                <div class="loading">加载中...</div>
            </div>
        </div>
    </div>

    <script>
        // 显示消息
        function showMessage(message, type = 'success') {
            const messageDiv = document.getElementById('message');
            messageDiv.innerHTML = \`<div class="\${type}">\${message}</div>\`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }

        // 复制到剪贴板
        async function copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                showMessage('已复制到剪贴板！');
            } catch (err) {
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showMessage('已复制到剪贴板！');
            }
        }

        // 加载所有URL
        async function loadUrls() {
            try {
                const response = await fetch('/api/urls');
                const urls = await response.json();
                
                const urlsList = document.getElementById('urlsList');
                
                if (urls.length === 0) {
                    urlsList.innerHTML = '<div class="loading">暂无短链接</div>';
                    return;
                }

                urlsList.innerHTML = urls.map(url => \`
                    <div class="url-item">
                        <div class="url-info">
                            <div class="short-url">
                                \${window.location.origin}/\${url.shortCode}
                                <button class="btn btn-small copy-btn" onclick="copyToClipboard('\${window.location.origin}/\${url.shortCode}')">
                                    复制
                                </button>
                            </div>
                            <div class="original-url">\${url.originalUrl}</div>
                            <div class="url-meta">
                                创建时间: \${new Date(url.createdAt).toLocaleString('zh-CN')}
                                <span class="stats">点击量: \${url.clicks || 0}</span>
                                \${url.lastClicked ? \`<span class="stats">最后点击: \${new Date(url.lastClicked).toLocaleString('zh-CN')}</span>\` : ''}
                            </div>
                        </div>
                        <div class="url-actions">
                            <button class="btn btn-small btn-info" onclick="editUrl('\${url.shortCode}', '\${url.originalUrl}')">
                                编辑
                            </button>
                            <button class="btn btn-small btn-danger" onclick="deleteUrl('\${url.shortCode}')">
                                删除
                            </button>
                        </div>
                    </div>
                \`).join('');
            } catch (error) {
                showMessage('加载失败: ' + error.message, 'error');
            }
        }

        // 创建短链
        document.getElementById('createForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalUrl = document.getElementById('originalUrl').value;
            const customCode = document.getElementById('customCode').value;
            
            try {
                const response = await fetch('/api/urls', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        originalUrl,
                        customCode: customCode || undefined
                    })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    showMessage(\`短链接创建成功！短码: \${result.shortCode}\`);
                    document.getElementById('createForm').reset();
                    loadUrls();
                } else {
                    showMessage(result.error || '创建失败', 'error');
                }
            } catch (error) {
                showMessage('创建失败: ' + error.message, 'error');
            }
        });

        // 删除URL
        async function deleteUrl(code) {
            if (!confirm('确定要删除这个短链接吗？')) return;
            
            try {
                const response = await fetch(\`/api/urls/\${code}\`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    showMessage('删除成功！');
                    loadUrls();
                } else {
                    showMessage('删除失败', 'error');
                }
            } catch (error) {
                showMessage('删除失败: ' + error.message, 'error');
            }
        }

        // 编辑URL
        function editUrl(code, currentUrl) {
            const newUrl = prompt('请输入新的网址:', currentUrl);
            if (!newUrl || newUrl === currentUrl) return;
            
            updateUrl(code, newUrl);
        }

        // 更新URL
        async function updateUrl(code, newUrl) {
            try {
                const response = await fetch(\`/api/urls/\${code}\`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        originalUrl: newUrl
                    })
                });
                
                if (response.ok) {
                    showMessage('更新成功！');
                    loadUrls();
                } else {
                    const result = await response.json();
                    showMessage(result.error || '更新失败', 'error');
                }
            } catch (error) {
                showMessage('更新失败: ' + error.message, 'error');
            }
        }

        // 页面加载时获取URL列表
        loadUrls();

        // 定时刷新数据
        setInterval(loadUrls, 30000); // 每30秒刷新一次
    </script>
</body>
</html>`;
}
```
## 然后点击右上角的部署


# 第二步 配置 KV 数据库

先创建一个KV数据库(名称随意)
在 Workers 设置中，找到 "设置" > "绑定" > "KV 命名空间" > "添加绑定"

变量名填写 `URL_SHORTENER`

然后选择刚刚创建的 KV 数据库，然后点击添加绑定

# 第三步 完成！

访问 `你的域名/admin` 登录后即可添加自定义短链
用户名 `admin`

---

文章编辑：`@鈴奈咲桜`
