package io.github.juniorcorzo.InstrumentsService.instruments.service;

import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class InstrumentsService {
    private InstrumentsRepository instrumentsRepository;

    public ResponseWithData<Instruments> getAll() {
        return new ResponseWithData<>(
                HttpStatus.OK,
                this.instrumentsRepository.findAll(),
                ResponseMessages.OK.getMessage()
                );
    }

    public ResponseWithData<Instruments> getById(String id) {
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(
                        this.instrumentsRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("No existe un instrumento con ese id"))),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData createInstruments(Instruments instruments) {
        this.instrumentsRepository.insert(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData updateInstruments(Instruments instruments) {
        this.instrumentsRepository.save(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData deleteInstruments(String id) {
        this.instrumentsRepository.deleteById(id);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }
}
