package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.config;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.CacheCleanerService;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.UnitProcessService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryInstrumentsCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryUnitProcessCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.InstrumentService;

@Configuration
public class OrchestrationBeans {

    @Bean
    public InMemoryInstrumentsCache instrumentsContext(InstrumentService instrumentService) {
        return InMemoryInstrumentsCache.getInstance(instrumentService);
    }

    @Bean
    public InMemoryUnitProcessCache unitProcessContext(UnitProcessService unitProcessService) {
        return InMemoryUnitProcessCache.getInstance(unitProcessService);
    }

    @Bean
    public CacheCleanerService cacheCleanerSchedule(InMemoryInstrumentsCache instrumentsCache, InMemoryUnitProcessCache unitProcessCache) {
        return new CacheCleanerService(instrumentsCache, unitProcessCache);
    }
}
