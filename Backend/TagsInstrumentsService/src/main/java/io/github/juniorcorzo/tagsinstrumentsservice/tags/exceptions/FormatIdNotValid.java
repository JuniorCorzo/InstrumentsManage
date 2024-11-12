package io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions;

import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.enums.ResponseMessages;

public class FormatIdNotValid extends RuntimeException {
    public FormatIdNotValid() {
        super(ResponseMessages.ID_FORMAT_NOT_VALID.getMessage());
    }
}
