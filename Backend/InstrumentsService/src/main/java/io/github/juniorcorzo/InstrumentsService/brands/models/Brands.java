package io.github.juniorcorzo.InstrumentsService.brands.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@Data
@Document(collection = "brandsColletion")
public class Brands {
    @MongoId(FieldType.OBJECT_ID)
    private String id;
    private String name;
}
