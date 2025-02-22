package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryInstrumentsCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryUnitProcessCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.tasks.CacheCleanerTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class CacheCleanerService {
    public CacheCleanerService(InMemoryInstrumentsCache instrumentsCache, InMemoryUnitProcessCache unitProcessCache) {
        ScheduledExecutorService scheduledExecutor = Executors.newSingleThreadScheduledExecutor();
        log.info("Starting scheduled cache cleaner task");
        scheduledExecutor.scheduleAtFixedRate(new CacheCleanerTask(instrumentsCache, unitProcessCache), 65L, 15L, TimeUnit.MINUTES);

    }

}
