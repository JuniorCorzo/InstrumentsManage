package io.github.juniorcorzo.InstrumentsService.utils;

import lombok.Getter;

@Getter
public enum ResponseMessages {
    OK("Operación completada existosamente"),
    INSTRUMENT_ID_NOT_FOUND("Id de intrumento no se encuentra registrado"),
    BRAND_ID_NOT_FOUND("Id de la marca no se encuentra registrado"),
    FORMAT_ID_NOT_VALID("El formato del id no es valido");

    private final String message;
    ResponseMessages(String message) {
        this.message = message;
    }
}
