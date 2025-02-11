package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("instruments")
public record InstrumentsDTO(
        String id,
        String model,
        String brand,
        String type,
        String measurementRange,
        String accuracy,
        String[] connectionType,
        String processConnection,
        String protectionClass,
        String[] certifications
) {
}
