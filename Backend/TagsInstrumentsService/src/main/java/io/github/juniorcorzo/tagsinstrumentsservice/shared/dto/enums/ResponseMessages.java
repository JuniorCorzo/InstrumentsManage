package io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResponseMessages {
    OK("Operación completada exitosamente"),
    TAG_ID_NOT_FOUND("El id del tag no se encuentra registrado");

    private final String message;
}
