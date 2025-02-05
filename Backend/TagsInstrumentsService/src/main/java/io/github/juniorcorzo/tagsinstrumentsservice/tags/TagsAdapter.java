package io.github.juniorcorzo.tagsinstrumentsservice.tags;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.entity.TagsEntity;

public class TagsAdapter {
    public static TagsDTO toDTO (TagsEntity tagsEntity) {
        return TagsDTO.builder()
                .id(tagsEntity.get_id())
                .tag(tagsEntity.getTag())
                .description(tagsEntity.getDescription())
                .idInstrument(tagsEntity.getIdInstruments())
                .idUnitProcess(tagsEntity.getIdUnitProcess())
                .typeUnit(tagsEntity.getTypeUnit())
                .alarms(tagsEntity.getAlarms())
                .isShutdown(tagsEntity.isShutdown())
                .build();
    }

    public static TagsEntity toEntity (TagsDTO tagsDTO ) {
        return TagsEntity.builder()
                ._id(tagsDTO.id())
                .tag(tagsDTO.tag())
                .description(tagsDTO.description())
                .idInstruments(tagsDTO.idInstrument())
                .idUnitProcess(tagsDTO.idUnitProcess())
                .typeUnit(tagsDTO.typeUnit())
                .alarms(tagsDTO.alarms())
                .shutdown(tagsDTO.isShutdown())
                .build();
    }
}
