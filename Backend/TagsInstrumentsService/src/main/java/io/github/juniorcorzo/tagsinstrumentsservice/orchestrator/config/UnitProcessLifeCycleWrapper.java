package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.config;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryUnitProcessCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.SmartLifecycle;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UnitProcessLifeCycleWrapper implements SmartLifecycle {
    private final InMemoryUnitProcessCache unitProcessContext;
    private boolean isRunning;

    public UnitProcessLifeCycleWrapper(InMemoryUnitProcessCache unitProcessContext) {
        this.unitProcessContext = unitProcessContext;
        this.isRunning = false;
    }

    @Override
    public void start() {
        log.info("Refreshing The Process Units Context");
        this.unitProcessContext.refreshContext();
        this.isRunning = true;
    }

    @Override
    public void stop() {
        this.isRunning = false;
    }

    @Override
    public boolean isRunning() {
        return this.isRunning;
    }

    @Override
    public int getPhase() {
        return Integer.MAX_VALUE;
    }
}
