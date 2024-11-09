package io.github.juniorcorzo.InstrumentsService.exception;

import io.github.juniorcorzo.InstrumentsService.utils.ResponseMessages;

public class FormatIdNotValid extends RuntimeException {
    public FormatIdNotValid() {
        super(ResponseMessages.FORMAT_ID_NOT_VALID.getMessage());
    }
}
