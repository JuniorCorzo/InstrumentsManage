package io.github.juniorcorzo.tagsinstrumentsservice.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.http.HttpStatus;

import java.util.List;

public record RetrieveDTO<T>(
                HttpStatus status,
                @JsonProperty("data") List<T> data,
                String message) {

}
