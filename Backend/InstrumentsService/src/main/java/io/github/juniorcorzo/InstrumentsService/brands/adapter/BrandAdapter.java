package io.github.juniorcorzo.InstrumentsService.brands.adapter;

import io.github.juniorcorzo.InstrumentsService.brands.dtos.BrandsDTO;
import io.github.juniorcorzo.InstrumentsService.brands.entity.BrandsEntity;

public class BrandAdapter {
    public static BrandsEntity toEntity(BrandsDTO dto) {
        return BrandsEntity.builder()
                ._id(dto.id())
                .name(dto.name())
                .country(dto.country())
                .website(dto.website())
                .build();
    }
    
    public static BrandsDTO toDTO(BrandsEntity entity) {
        return BrandsDTO.builder()
                .id(entity.get_id())
                .name(entity.getName())
                .country(entity.getCountry())
                .website(entity.getWebsite())
                .build();
    }
}
