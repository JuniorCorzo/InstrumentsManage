package io.github.juniorcorzo.InstrumentsService.shared.dto;

import org.springframework.http.HttpStatus;

public record ResponseWithoutData(
        HttpStatus httpStatus,
        String message
) {
}
