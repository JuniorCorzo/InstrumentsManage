package io.github.juniorcorzo.InstrumentsService.brands.exceptions;

import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;

public class BrandIdNotFound extends RuntimeException {
    public BrandIdNotFound() {
        super(ResponseMessages.BRAND_ID_NOT_FOUND.getMessage());
    }
}
