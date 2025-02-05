package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("unitProcess")
public record UnitProcessDTO(
        @JsonProperty("id")
        String id,
        String name,
        CampDTO camp
) {

}

record CampDTO(String name) {

}