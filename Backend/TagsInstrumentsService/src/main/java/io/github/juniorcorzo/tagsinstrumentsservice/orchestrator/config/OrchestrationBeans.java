package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.config;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.components.InMemoryUnitProcessContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.UnitProcessService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.components.InMemoryInstrumentsContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.InstrumentService;

@Configuration
public class OrchestrationBeans {

    @Bean
    public InMemoryInstrumentsContext instrumentsContext(InstrumentService instrumentService) {
        return InMemoryInstrumentsContext.getInstance(instrumentService);
    }

    @Bean
    public InMemoryUnitProcessContext unitProcessContext(UnitProcessService unitProcessService) {
        return InMemoryUnitProcessContext.getInstance(unitProcessService);
    }
}
