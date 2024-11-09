package io.github.juniorcorzo.InstrumentsService.instruments.controller;

import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.exceptions.InstrumentIdNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InstrumentsHandlerController {

    @ExceptionHandler(InstrumentIdNotFound.class)
    public ResponseEntity<ResponseWithoutData> exceptionResponse(InstrumentIdNotFound e){
        return new ResponseEntity<>(new ResponseWithoutData(HttpStatus.NOT_FOUND, e.getMessage()), HttpStatus.NOT_FOUND);
    }
}
