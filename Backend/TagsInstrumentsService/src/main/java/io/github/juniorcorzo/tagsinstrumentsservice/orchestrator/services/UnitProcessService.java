package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.RetrieveDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class UnitProcessService {
    private final RestTemplate restTemplate;
    private final ParameterizedTypeReference<RetrieveDTO<UnitProcessDTO>> responseType;

    public UnitProcessService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.responseType = new ParameterizedTypeReference<>() {
        };
    }

    public List<UnitProcessDTO> getAllUnitProcess() {
        try {
            log.info("Fetching all instruments");
            ResponseEntity<RetrieveDTO<UnitProcessDTO>> response = this.restTemplate.exchange(
                    "lb://UNIT-PROCESS-SERVICE/unit-process/all",
                    HttpMethod.GET,
                    null,
                    this.responseType);

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new IOException("Unexpected code");
            }

            List<UnitProcessDTO> unitsProcessResponse = Objects.requireNonNull(response.getBody().data());
            return unitsProcessResponse;
        } catch (Exception e) {
            log.error("Error to send request: {}", e.getMessage());
        }

        return Collections.emptyList();
    }

    public UnitProcessDTO getUnitProcessById(String idUnitProcess) {
        try {
            log.info("Fetching process unit with id {}", idUnitProcess);
            ResponseEntity<RetrieveDTO<UnitProcessDTO>> response = this.restTemplate.exchange(
                    "lb://UNIT-PROCESS-SERVICE/unit-process/{id}",
                    HttpMethod.GET,
                    null,
                    this.responseType,
                    idUnitProcess);

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new IOException("Unexpected Code");
            }

            UnitProcessDTO unitProcessResponse = Objects.requireNonNull(response.getBody().data()).getFirst();
            return unitProcessResponse;
        } catch (IOException e) {
            log.error("Error to send request at Process Unit Service: ", e.getMessage());
        }
        return null;
    }
}
