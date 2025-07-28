class LocalCacheService {
    constructor() {
        this.cacheKey = 'cscl_posts_cache';
        this.timestampKey = 'cscl_cache_timestamp';
        this.cacheValidityHours = 12;
    }

    isCacheValid() {
        try {
            const timestamp = localStorage.getItem(this.timestampKey);
            if (!timestamp) return false;

            const cacheTime = parseInt(timestamp);
            const now = Date.now();
            const validityDuration = this.cacheValidityHours * 60 * 60 * 1000;

            return (now - cacheTime) < validityDuration;
        } catch (error) {
            console.log(`Erro ao verificar validade do cache: ${error}`);
            return false;
        }
    }

    saveToCache(postsData) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(postsData));
            localStorage.setItem(this.timestampKey, Date.now().toString());

        } catch (error) {
            console.log(`Erro ao salvar no cache local: ${error}`);
        }
    }

    getFromCache() {
        try {
            const cachedData = localStorage.getItem(this.cacheKey);
            if (!cachedData) return null;

            const parsedData = JSON.parse(cachedData);
            return parsedData;

        } catch (error) {
            console.log(`Erro ao obter do cache local: ${error}`);
            return null;
        }
    }

    hasCache() {
        return localStorage.getItem(this.cacheKey) !== null;
    }

    clearCache() {
        try {
            localStorage.removeItem(this.cacheKey);
            localStorage.removeItem(this.timestampKey);
            console.log(`Cache local limpo.`);

        } catch (error) {
            console.log(`Erro ao limpar o cache local: ${error}`);
        }
    }

    getCacheInfo() {
        const timestamp = localStorage.getItem(this.timestampKey);
        if (!timestamp) return null;

        const cacheTime = new Date(parseInt(timestamp));
        const isValid = this.isCacheValid();

        return {
            cacheTime: cacheTime.toLocaleString(),
            isValid: isValid,
            hasData: this.hasCache()
        }
    }
}

export default new LocalCacheService();