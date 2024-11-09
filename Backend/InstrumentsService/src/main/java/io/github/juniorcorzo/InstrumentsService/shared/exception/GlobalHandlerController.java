package io.github.juniorcorzo.InstrumentsService.shared.exception;

import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalHandlerController {
    @ExceptionHandler(FormatIdNotValid.class)
    public ResponseEntity<ResponseWithoutData> exceptionResponse(FormatIdNotValid e){
        return new ResponseEntity<>(new ResponseWithoutData(HttpStatus.CONFLICT, e.getMessage()), HttpStatus.CONFLICT);
    }

}
