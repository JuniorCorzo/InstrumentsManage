package io.github.juniorcorzo.tagsinstrumentsservice.tags.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;

import java.util.List;

public record RetrieveDTO(
        HttpStatus status,
        @JsonProperty("data")
        List<InstrumentsDTO> data,
        String message
){

}

