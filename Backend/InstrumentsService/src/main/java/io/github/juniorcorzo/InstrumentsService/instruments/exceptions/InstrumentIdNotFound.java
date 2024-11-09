package io.github.juniorcorzo.InstrumentsService.instruments.exceptions;

import io.github.juniorcorzo.InstrumentsService.utils.ResponseMessages;

public class InstrumentIdNotFound extends RuntimeException {
    public InstrumentIdNotFound() {
        super(ResponseMessages.INSTRUMENT_ID_NOT_FOUND.getMessage());
    }
}
