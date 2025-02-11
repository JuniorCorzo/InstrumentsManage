package io.github.juniorcorzo.InstrumentsService.instruments.adapters;


import io.github.juniorcorzo.InstrumentsService.instruments.dtos.InstrumentsDTO;
import io.github.juniorcorzo.InstrumentsService.instruments.entity.InstrumentsEntity;

public class InstrumentsAdapter {
    public static InstrumentsEntity toEntity(InstrumentsDTO dto) {
        return InstrumentsEntity.builder()
                ._id(dto.id())
                .model(dto.model())
                .brand(dto.brand())
                .type(dto.type())
                .measurementRange(dto.measurementRange())
                .accuracy(dto.accuracy())
                .connectionType(dto.connectionType())
                .processConnection(dto.processConnection())
                .protectionClass(dto.protectionClass())
                .certifications(dto.certifications())
                .build();
    }

    public static InstrumentsDTO toDTO(InstrumentsEntity entity) {
        return InstrumentsDTO.builder()
                .id(entity.get_id())
                .model(entity.getModel())
                .brand(entity.getBrand())
                .type(entity.getType())
                .measurementRange(entity.getMeasurementRange())
                .accuracy(entity.getAccuracy())
                .connectionType(entity.getConnectionType())
                .processConnection(entity.getProcessConnection())
                .protectionClass(entity.getProtectionClass())
                .certifications(entity.getCertifications())
                .build();
    }
}
