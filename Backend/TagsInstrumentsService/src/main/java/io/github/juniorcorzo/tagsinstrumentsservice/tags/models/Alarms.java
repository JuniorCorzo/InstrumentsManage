package io.github.juniorcorzo.tagsinstrumentsservice.tags.models;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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

