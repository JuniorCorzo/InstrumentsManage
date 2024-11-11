package io.github.juniorcorzo.tagsinstrumentsservice.tags.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
public class Alarms {
    private final int HH;
    private final int H;
    private final int L;
    private final int LL;
}

