package io.github.juniorcorzo.tagsinstrumentsservice.common.dto;

import org.springframework.http.HttpStatus;

public record ResponseWithoutData(
        HttpStatus httpStatus,
        String message
) {
}
