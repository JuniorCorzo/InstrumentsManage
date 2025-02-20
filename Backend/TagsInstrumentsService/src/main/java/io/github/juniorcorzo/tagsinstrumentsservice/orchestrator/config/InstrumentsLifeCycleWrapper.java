package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.config;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryInstrumentsCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.SmartLifecycle;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class InstrumentsLifeCycleWrapper implements SmartLifecycle {
    private final InMemoryInstrumentsCache instrumentsContext;
    private boolean isRunning;

    public InstrumentsLifeCycleWrapper(InMemoryInstrumentsCache instrumentsContext) {
        this.instrumentsContext = instrumentsContext;

        this.isRunning = false;
    }

    @Override
    public void start() {
        log.info("Refreshing the Instruments Context");
        this.instrumentsContext.refreshContext();

        this.isRunning = true;
    }

    @Override
    public void stop() {
        this.isRunning = false;
    }

    @Override
    public boolean isRunning() {
        return isRunning;
    }


    @Override
    public int getPhase() {
        return Integer.MAX_VALUE;
    }
}
