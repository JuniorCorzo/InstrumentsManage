package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.RetrieveDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class InstrumentService {

    private final RestTemplate restTemplate;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentService.class);
    private final ParameterizedTypeReference<RetrieveDTO<InstrumentsDTO>> responseType;

    public InstrumentService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.responseType = new ParameterizedTypeReference<>() {
        };
    }

    public List<InstrumentsDTO> getAllInstruments() {
        this.LOGS.info("Fetching all instruments");
        try {
            ResponseEntity<RetrieveDTO<InstrumentsDTO>> response = this.restTemplate.exchange(
                    "lb://INSTRUMENTS-SERVICE/instruments/all",
                    HttpMethod.GET,
                    null,
                    this.responseType);
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new IOException("Unexpected Code: " + response.getStatusCode());
            }
            List<InstrumentsDTO> instrumentsResponse = Objects.requireNonNull(response.getBody().data());
            return instrumentsResponse;
        } catch (Exception e) {
            this.LOGS.info("Error to send request at instruments service: {}", e.getMessage());
        }

        return Collections.emptyList();
    }

    public InstrumentsDTO getInstrumentById(String id) {
        this.LOGS.info("Fetching instrument with id {}", id);
        try {
            ResponseEntity<RetrieveDTO<InstrumentsDTO>> response = this.restTemplate
                    .exchange("lb://INSTRUMENTS-SERVICE/instruments?id={id}",
                            HttpMethod.GET, null,
                            this.responseType,
                            id);
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new IOException("Unexpected Code: " + response.getStatusCode());
            }
            InstrumentsDTO instrumentResponse = Objects.requireNonNull(response.getBody().data()).getFirst();
            return instrumentResponse;
        } catch (IOException e) {
            this.LOGS.error("Error to send request at instruments service: {}", e.getMessage());
        }

        return null;
    }
}
