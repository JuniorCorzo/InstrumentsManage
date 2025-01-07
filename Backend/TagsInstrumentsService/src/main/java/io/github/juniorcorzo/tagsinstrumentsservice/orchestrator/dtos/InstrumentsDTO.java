package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos;

import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonTypeName("instruments")
public record InstrumentsDTO(
                String id,
                String model,
                BrandsDTO brand,
                String type) {
}

record BrandsDTO(String name) {
}
