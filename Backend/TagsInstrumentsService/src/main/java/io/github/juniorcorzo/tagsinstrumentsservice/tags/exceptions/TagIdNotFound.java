package io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions;

import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.enums.ResponseMessages;

public class TagIdNotFound extends RuntimeException {
    public TagIdNotFound() {
        super(ResponseMessages.TAG_ID_NOT_FOUND.getMessage());
    }
}
