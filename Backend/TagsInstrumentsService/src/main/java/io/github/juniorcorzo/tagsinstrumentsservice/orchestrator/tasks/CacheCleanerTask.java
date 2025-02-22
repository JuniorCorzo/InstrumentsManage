package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.tasks;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.CacheNode;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryInstrumentsCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryUnitProcessCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.Map;

@Slf4j
public class CacheCleanerTask implements Runnable {
    private final Map<String, CacheNode<InstrumentsDTO>> instrumentsCache;
    private final Map<String, CacheNode<UnitProcessDTO>> unitProcessCache;

    public CacheCleanerTask(InMemoryInstrumentsCache instrumentsCache, InMemoryUnitProcessCache unitProcessCache) {
        this.instrumentsCache = instrumentsCache.getCache();
        this.unitProcessCache = unitProcessCache.getCache();
    }

    @Override
    public void run() {
        log.info("Cache wipe started");
        Thread.currentThread().setName("CacheCleaner");
        this.removeExpiredCache(this.instrumentsCache);
        this.removeExpiredCache(this.unitProcessCache);
    }

    private <T> void removeExpiredCache(Map<String, CacheNode<T>> cache) {
        int initialSize = cache.size();
        cache.forEach((key, cacheNode) -> {
            Long createdAt = cacheNode.getTimestamp();
            Long actualTime = Instant.now().getEpochSecond();
            if ((actualTime - createdAt) >= 3600) {
                cache.remove(key, cacheNode);
            }
        });
        log.info("Cache Clear: {} expired items found and removed.", initialSize - cache.size());
    }
 }
