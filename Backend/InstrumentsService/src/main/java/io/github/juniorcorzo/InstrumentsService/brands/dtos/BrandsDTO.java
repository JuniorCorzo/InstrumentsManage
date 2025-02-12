package io.github.juniorcorzo.InstrumentsService.brands.dtos;

import lombok.Builder;

@Builder
public record BrandsDTO(
        String id,
        String name,
        String country,
        String website
) {
}
