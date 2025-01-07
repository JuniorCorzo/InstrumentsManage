package io.github.juniorcorzo.tagsinstrumentsservice.tags.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document("tagsCollection")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Tags {
    @MongoId(FieldType.OBJECT_ID)
    private String id;
    private String tag;
    private String description;
    private String idInstruments;
    private String unitProcess;
    private String typeUnit;
    private Alarms alarms;
    private boolean shutdown;

}
