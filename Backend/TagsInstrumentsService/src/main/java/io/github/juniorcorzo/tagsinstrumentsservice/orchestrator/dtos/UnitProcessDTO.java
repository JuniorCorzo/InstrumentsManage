package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos;

public record UnitProcessDTO(
        String id,
        String name,
        CampDTO camp) {

}

record CampDTO(String name) {

}