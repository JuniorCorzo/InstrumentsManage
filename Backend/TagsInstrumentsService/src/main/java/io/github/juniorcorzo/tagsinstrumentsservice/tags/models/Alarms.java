package io.github.juniorcorzo.tagsinstrumentsservice.tags.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;

@JsonPropertyOrder({"hh", "h", "l", "ll"})
@AllArgsConstructor
@Data
public class Alarms {
    private final double HH;
    private final double H;
    private final double L;
    private final double LL;
}

