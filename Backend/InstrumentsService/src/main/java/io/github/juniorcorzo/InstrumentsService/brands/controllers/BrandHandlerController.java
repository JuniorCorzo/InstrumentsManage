package io.github.juniorcorzo.InstrumentsService.brands.controllers;

import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BrandHandlerController {
    @ExceptionHandler(BrandIdNotFound.class)
    public ResponseEntity<ResponseWithoutData> exceptionResponse(BrandIdNotFound e) {
        return new ResponseEntity<>(new ResponseWithoutData(HttpStatus.NOT_FOUND, e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
