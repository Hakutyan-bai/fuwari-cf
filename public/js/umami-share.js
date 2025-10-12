/**
 * Umami 统计数据获取和缓存工具
 * 用于处理共享数据获取、缓存和错误处理
 */

// 全局缓存对象
const umamiCache = new Map();

/**
 * 获取 Umami 共享数据
 * @param {string} shareId - 共享ID
 * @returns {Promise<Object>} 共享数据
 */
async function fetchShareData(shareId) {
  const cacheKey = `share_${shareId}`;
  
  // 检查缓存
  if (umamiCache.has(cacheKey)) {
    const cached = umamiCache.get(cacheKey);
    // 缓存1小时
    if (Date.now() - cached.timestamp < 60 * 60 * 1000) {
      return cached.data;
    }
  }
  
  try {
    const response = await fetch(`https://cloud.umami.is/analytics/eu/api/share/${shareId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch share data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 存储到缓存
    umamiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching Umami share data:', error);
    throw error;
  }
}

/**
 * 获取网站统计数据
 * @param {string} websiteId - 网站ID
 * @param {string} token - 访问令牌
 * @param {Object} params - 查询参数
 * @returns {Promise<Object>} 统计数据
 */
async function fetchWebsiteStats(websiteId, token, params) {
  const cacheKey = `stats_${websiteId}_${JSON.stringify(params)}`;
  
  // 检查缓存
  if (umamiCache.has(cacheKey)) {
    const cached = umamiCache.get(cacheKey);
    // 缓存5分钟
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.data;
    }
  }
  
  try {
    const url = `https://cloud.umami.is/analytics/eu/api/websites/${websiteId}/stats?` + 
      new URLSearchParams(params);
      
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-umami-share-token': token,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 存储到缓存
    umamiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching Umami stats:', error);
    throw error;
  }
}

// 导出函数供全局使用
window.fetchShareData = fetchShareData;
window.fetchWebsiteStats = fetchWebsiteStats;