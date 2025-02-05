package io.github.juniorcorzo.InstrumentsService.brands.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@Data
@Builder
@Document(collection = "Brands")
public class BrandsEntity {
    @MongoId(FieldType.OBJECT_ID)
    private String _id;
    private String name;
    private String website;
}
