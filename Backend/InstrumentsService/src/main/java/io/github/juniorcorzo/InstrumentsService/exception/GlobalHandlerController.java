package io.github.juniorcorzo.InstrumentsService.exception;

import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalHandlerController {
    @ExceptionHandler(FormatIdNotValid.class)
    public ResponseEntity<ResponseWithoutData> exceptionResponse(FormatIdNotValid e){
        return new ResponseEntity<>(new ResponseWithoutData(HttpStatus.CONFLICT, e.getMessage()), HttpStatus.CONFLICT);
    }

}
