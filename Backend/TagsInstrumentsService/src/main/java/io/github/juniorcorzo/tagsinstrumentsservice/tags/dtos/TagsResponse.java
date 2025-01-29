package io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonMerge;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.auxiliar.AlarmsDTO;
import lombok.Data;
import lombok.Getter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class TagsResponse {
        private final String id;
        private final String tag;
        private final String description;
        @JsonMerge
        private final InstrumentsDTO instruments;
        @JsonMerge
        private final UnitProcessDTO unitProcess;
        private final String typeUnit;
        private final AlarmsDTO alarms;
        private final boolean shutdown;

        @JsonCreator()
        public TagsResponse(
                @JsonProperty("id") String id,
                @JsonProperty("tag")String tag,
                @JsonProperty("description") String description,
                @JsonProperty("instruments") InstrumentsDTO instruments,
                @JsonProperty("unitProcess") UnitProcessDTO unitProcess,
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


