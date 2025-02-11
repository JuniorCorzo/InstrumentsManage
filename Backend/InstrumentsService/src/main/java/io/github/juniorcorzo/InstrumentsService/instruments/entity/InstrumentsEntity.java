package io.github.juniorcorzo.InstrumentsService.instruments.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Document(collection = "Instruments")
public class InstrumentsEntity {
    @MongoId(FieldType.OBJECT_ID)
    private String _id;
    private String model;
    private String brand;
    private String type;
    private String measurementRange;
    private String accuracy;
    private String[] connectionType;
    private String processConnection;
    private String protectionClass;
    private String[] certifications;
}