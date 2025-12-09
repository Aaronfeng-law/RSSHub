import { LRUCache } from 'lru-cache';
import { config } from '@/config';
const status = { available: false };
const clients = {};
export default {
    init: () => {
        clients.memoryCache = new LRUCache({
            ttl: config.cache.routeExpire * 1000,
            max: config.memory.max,
        });
        status.available = true;
    },
    get: (key, refresh = true) => {
        if (key && status.available && clients.memoryCache) {
            let value = clients.memoryCache.get(key, { updateAgeOnGet: refresh });
            if (value) {
                value = value + '';
            }
            return value;
        }
        else {
            return null;
        }
    },
    set: (key, value, maxAge = config.cache.contentExpire) => {
        if (!value || value === 'undefined') {
            value = '';
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (key && status.available && clients.memoryCache) {
            return clients.memoryCache.set(key, value, { ttl: maxAge * 1000 });
        }
    },
    clients,
    status,
};
//# sourceMappingURL=memory.js.map