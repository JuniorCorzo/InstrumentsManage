package io.github.juniorcorzo.InstrumentsService.utils;

import lombok.Getter;

@Getter
public enum ResponseMessages {
    OK("Operación completada existosamente");

    private final String message;
    ResponseMessages(String message) {
        this.message = message;
    }
}
