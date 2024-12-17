package io.github.juniorcorzo.tagsinstrumentsservice.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResponseMessages {
    OK("Operación completada exitosamente"),
    TAG_ID_NOT_FOUND("El id del tag no se encuentra registrado"),
    ID_FORMAT_NOT_VALID("Formato del id no es valido");

    private final String message;
}
