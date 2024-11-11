package io.github.juniorcorzo.tagsinstrumentsservice.tags.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
public class Alarms {
    private final double HH;
    private final double H;
    private final double L;
    private final double LL;
}

