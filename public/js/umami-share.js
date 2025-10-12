const CACHE_CONFIG = {
  shareData: {
    keyPrefix: 'umami_share_',
    ttl: 60 * 60 * 1000
  },
  websiteStats: {
    keyPrefix: 'umami_stats_',
    ttl: 5 * 60 * 1000
  }
};

function getCache(key) {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < parsed.ttl) {
        return parsed.data;
      } else {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    localStorage.removeItem(key);
  }
  return null;
}

function setCache(key, data, ttl) {
  try {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (error) {
  }
}

function clearUmamiCache() {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_CONFIG.shareData.keyPrefix) || 
          key.startsWith(CACHE_CONFIG.websiteStats.keyPrefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
  }
}

async function fetchShareData(shareId) {
  const cacheKey = `${CACHE_CONFIG.shareData.keyPrefix}${shareId}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(`https://cloud.umami.is/analytics/eu/api/share/${shareId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch share data: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data, CACHE_CONFIG.shareData.ttl);
    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchWebsiteStats(websiteId, token, params) {
  const cacheKey = `${CACHE_CONFIG.websiteStats.keyPrefix}${websiteId}_${JSON.stringify(params)}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
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
    setCache(cacheKey, data, CACHE_CONFIG.websiteStats.ttl);
    return data;
  } catch (error) {
    throw error;
  }
}

window.fetchShareData = fetchShareData;
window.fetchWebsiteStats = fetchWebsiteStats;
window.clearUmamiCache = clearUmamiCache;