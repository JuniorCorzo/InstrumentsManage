package io.github.juniorcorzo.tagsinstrumentsservice.tags.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@JsonIgnoreProperties({"idInstrument", "unitProcess"})
@Document("Tags")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TagsEntity {
    @MongoId(FieldType.OBJECT_ID)
    private String _id;
    private String tag;
    private String description;
    private String idInstrument;
    private String idUnitProcess;
    private String typeUnit;
    private Alarms alarms;
    private boolean shutdown;

}


