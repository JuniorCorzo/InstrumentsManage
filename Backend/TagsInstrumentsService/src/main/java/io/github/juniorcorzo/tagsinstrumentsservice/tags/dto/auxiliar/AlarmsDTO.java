package io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.auxiliar;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AlarmsDTO(
    @JsonProperty("hh") double hh,
    @JsonProperty("h") double h,
    @JsonProperty("l") double l,
    @JsonProperty("ll") double ll) {
}