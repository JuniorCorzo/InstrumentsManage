package io.github.juniorcorzo.InstrumentsService.instruments.dtos;

import lombok.Builder;

@Builder
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
