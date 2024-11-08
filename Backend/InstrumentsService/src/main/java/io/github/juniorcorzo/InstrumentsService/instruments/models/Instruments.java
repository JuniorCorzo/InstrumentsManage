package io.github.juniorcorzo.InstrumentsService.instruments.models;

import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@NoArgsConstructor
@Document(collection = "instrumentsCollection")
public class Instruments {
    @MongoId(FieldType.OBJECT_ID)
    private String id;
    private String model;
    private Brands brand;
    private String type;
}