package io.github.juniorcorzo.tagsinstrumentsservice.shared.dto;

import org.springframework.http.HttpStatus;

public record ResponseWithoutData(
        HttpStatus httpStatus,
        String message
) {
}
