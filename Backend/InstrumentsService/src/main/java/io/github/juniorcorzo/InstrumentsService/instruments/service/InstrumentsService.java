package io.github.juniorcorzo.InstrumentsService.instruments.service;

import io.github.juniorcorzo.InstrumentsService.instruments.adapters.InstrumentsAdapter;
import io.github.juniorcorzo.InstrumentsService.instruments.dtos.InstrumentsDTO;
import io.github.juniorcorzo.InstrumentsService.instruments.validations.InstrumentsValidations;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.exceptions.InstrumentIdNotFound;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class InstrumentsService {
    private final InstrumentsRepository instrumentsRepository;
    private final InstrumentsValidations validations;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentsService.class);

    public ResponseWithData<InstrumentsDTO> getAll() {
        LOGS.info("Fetching all instruments");
        List<InstrumentsDTO> instrumentsData =
                this.instrumentsRepository
                        .findAll()
                        .stream()
                        .map(InstrumentsAdapter::toDTO)
                        .toList();

        return new ResponseWithData<>(
                HttpStatus.OK,
                instrumentsData,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<InstrumentsDTO> getById(String id) {
        LOGS.info("Fetching instrument with id {}", id);
        validations.validIdWithInstrumentExists(id);
        List<InstrumentsDTO> instrumentData =
                Stream.of(this.instrumentsRepository
                                .findById(id)
                                .orElseThrow(InstrumentIdNotFound::new)
                        ).map(InstrumentsAdapter::toDTO)
                        .toList();


        return new ResponseWithData<>(
                HttpStatus.OK,
                instrumentData,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<InstrumentsDTO> createInstruments(InstrumentsDTO instrumentsDTO) {
        LOGS.info("Insert a new instrument");
        InstrumentsDTO instrumentData =
                InstrumentsAdapter.toDTO(
                        this.instrumentsRepository
                                .insert(InstrumentsAdapter.toEntity(instrumentsDTO)
                                )
                );
        LOGS.info("Instrument inserted with id {} successfully", instrumentData.id());
        return new ResponseWithData<>(
                HttpStatus.CREATED,
                Collections.singletonList(instrumentData),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<InstrumentsDTO> updateInstruments(InstrumentsDTO instrumentsDTO) {
        LOGS.info("Updating instrument with id {}", instrumentsDTO.id());
        validations.validIdWithInstrumentExists(instrumentsDTO.id());
        InstrumentsDTO instrumentData =
                InstrumentsAdapter.toDTO(
                        this.instrumentsRepository.save(InstrumentsAdapter.toEntity(instrumentsDTO)
                        )
                );
        LOGS.info("Instrument updated with id {} successfully", instrumentData.id());

        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(instrumentData),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData deleteInstruments(String id) {
        LOGS.info("Deleting instrument with id {}", id);
        validations.validIdWithInstrumentExists(id);

        this.instrumentsRepository.deleteById(id);
        return new ResponseWithoutData(HttpStatus.OK, ResponseMessages.OK.getMessage());
    }
}
