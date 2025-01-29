package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("unitProcess")
public record UnitProcessDTO(
        @JsonProperty("id")
        String id,
        String name,
        String description,
        CampDTO camp
) {

}

record CampDTO(String name, Location location) {

}

record Location(
        String municipality,
        String department,
        String country,
        String[] coordinates
){}