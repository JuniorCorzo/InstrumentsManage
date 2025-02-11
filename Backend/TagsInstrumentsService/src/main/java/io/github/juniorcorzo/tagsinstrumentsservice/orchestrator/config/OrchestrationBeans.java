package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.config;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.UnitProcessService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.InMemoryInstrumentsContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.InMemoryUnitProcessContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.InstrumentService;
import org.springframework.context.annotation.DependsOn;

@Configuration
@DependsOn({"discoveryClient", "restTemplate"})
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
