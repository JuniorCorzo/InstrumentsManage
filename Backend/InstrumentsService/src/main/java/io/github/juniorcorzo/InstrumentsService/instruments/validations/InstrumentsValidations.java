package io.github.juniorcorzo.InstrumentsService.instruments.validations;

import io.github.juniorcorzo.InstrumentsService.instruments.exceptions.InstrumentIdNotFound;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.exception.FormatIdNotValid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class InstrumentsValidations {
    private final InstrumentsRepository instrumentsRepository;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentsValidations.class);

    private void validIdFormat(String id){
        boolean isValid = ObjectId.isValid(id);
        if (!isValid) {
            LOGS.error("ID is not valid");
            throw new FormatIdNotValid();
        }
    }

    public void validIdWithInstrumentExists(String id) {
        validIdFormat(id);
        if (!this.instrumentsRepository.existsById(id)) {
            LOGS.error("Instruments with {} not found", id);
            throw new InstrumentIdNotFound();
        }
    }
}
