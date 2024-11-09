package io.github.juniorcorzo.InstrumentsService.instruments.service;

import io.github.juniorcorzo.InstrumentsService.instruments.validations.InstrumentsValidations;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.shared.exception.FormatIdNotValid;
import io.github.juniorcorzo.InstrumentsService.instruments.exceptions.InstrumentIdNotFound;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class InstrumentsService {
    private final InstrumentsRepository instrumentsRepository;
    private final InstrumentsValidations validations;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentsService.class);

    public ResponseWithData<Instruments> getAll() {
        LOGS.info("Fetching all instruments");
        return new ResponseWithData<>(
                HttpStatus.OK,
                this.instrumentsRepository.findAll(),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<Instruments> getById(String id) {
        LOGS.info("Fetching instrument with id {}", id);
        validations.validIdWithInstrumentExists(id);

        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(
                        this.instrumentsRepository.findById(id)
                                .orElseThrow(InstrumentIdNotFound::new)),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData createInstruments(Instruments instruments) {
        LOGS.info("Insert a new instrument");
        this.instrumentsRepository.insert(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData updateInstruments(Instruments instruments) {
        LOGS.info("Updating instrument with id {}", instruments.getId());
        validations.validIdWithInstrumentExists(instruments.getId());

        this.instrumentsRepository.save(instruments);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData deleteInstruments(String id) {
        LOGS.info("Deleting instrument with id {}", id);
        validations.validIdWithInstrumentExists(id);

        this.instrumentsRepository.deleteById(id);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }
}
