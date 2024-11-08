package io.github.juniorcorzo.InstrumentsService.dto;

import org.springframework.http.HttpStatus;

import java.util.List;

public record ResponseWithData<T>(
        HttpStatus status,
        List<T> data,
        String message
) {
}
