package io.github.juniorcorzo.InstrumentsService.instruments.service;

import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.shared.exception.FormatIdNotValid;
import io.github.juniorcorzo.InstrumentsService.instruments.exceptions.InstrumentIdNotFound;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

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
        if (!ObjectId.isValid(id)) {
            throw new FormatIdNotValid();
        }

        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(
                        this.instrumentsRepository.findById(id)
                                .orElseThrow(InstrumentIdNotFound::new)),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData createInstruments(Instruments instruments) {
        this.instrumentsRepository.insert(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData updateInstruments(Instruments instruments) {
        if (!ObjectId.isValid(instruments.getId())) throw new FormatIdNotValid();
        if (!this.instrumentsRepository.existsById(instruments.getId())) throw new InstrumentIdNotFound();

        this.instrumentsRepository.save(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData deleteInstruments(String id) {
        if (!ObjectId.isValid(id)) throw new FormatIdNotValid();
        if (!this.instrumentsRepository.existsById(id)) throw new InstrumentIdNotFound();

        this.instrumentsRepository.deleteById(id);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }
}
