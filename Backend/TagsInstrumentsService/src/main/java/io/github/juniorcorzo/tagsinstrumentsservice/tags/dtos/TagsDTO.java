package io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.entity.Alarms;
import lombok.Builder;

@Builder
public record TagsDTO(
    String id,
    String tag,
    String description,
    String idInstrument,
    String idUnitProcess,
    String typeUnit,
    Alarms alarms,
    boolean isShutdown
) {
}
