package io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonMerge;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.auxiliar.AlarmsDTO;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class TagsResponse {
        private String id;
        private String tag;
        private String description;
        @JsonMerge
        private InstrumentsDTO instruments;
        private String unitProcess;
        private String typeUnit;
        private AlarmsDTO alarms;
        private boolean shutdown;

        @JsonCreator()
        public TagsResponse(
                @JsonProperty("id") String id,
                @JsonProperty("tag")String tag,
                @JsonProperty("description") String description,
                @JsonProperty("instruments") InstrumentsDTO instruments,
                @JsonProperty("unitProcess") String unitProcess,
                @JsonProperty("alarms") AlarmsDTO alarms,
                @JsonProperty("typeUnit") String typeUnit,
                @JsonProperty("shutdown") boolean shutdown
        ) {
                this.id = id;
                this.tag = tag;
                this.description = description;
                this.instruments = instruments;
                this.unitProcess = unitProcess;
                this.alarms = alarms;
                this.typeUnit = typeUnit;
                this.shutdown = shutdown;
        }
}


