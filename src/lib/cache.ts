type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

const cache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCachedData<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = DEFAULT_TTL
): Promise<T> {
    const entry = cache.get(key);
    const now = Date.now();

    if (entry && now - entry.timestamp < ttl) {
        return entry.data;
    }

    const data = await fetcher();
    cache.set(key, { data, timestamp: now });
    return data;
}
