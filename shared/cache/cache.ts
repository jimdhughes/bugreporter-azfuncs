import * as NodeCache from 'node-cache';

// 5 minute is the default cache time
const APP_CACHE_IN_SECONDS: number = parseInt(process.env.NODE_CACHE_IN_SECONDS) || 600;
const appCache = new NodeCache({ stdTTL: APP_CACHE_IN_SECONDS, checkperiod: APP_CACHE_IN_SECONDS + 50 });

// Note: this uses a local cache but we could use a distributed cache like Redis or AzureCache
function GetCachedItem<T>(key: string) {
  return appCache.get<T>(key);
}

function DeleteItemByKey<T>(key: string) {
  return appCache.del(key);
}

function SetCachedItem<T>(key: string, obj: T) {
  return appCache.set<T>(key, obj)
}

function GetCacheStats() {
  return appCache.getStats();
}

export default {
  GetCachedItem,
  DeleteItemByKey,
  SetCachedItem,
  GetCacheStats
}