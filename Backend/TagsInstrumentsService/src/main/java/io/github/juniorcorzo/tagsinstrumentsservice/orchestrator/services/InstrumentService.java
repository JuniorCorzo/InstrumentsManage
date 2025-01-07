package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.RetrieveDTO;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InstrumentService {
    private final RestTemplate restTemplate;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentService.class);
    private final ParameterizedTypeReference<RetrieveDTO<InstrumentsDTO>> responseType;

    public InstrumentService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.responseType = new ParameterizedTypeReference<RetrieveDTO<InstrumentsDTO>>() {
        };
    }

    public List<InstrumentsDTO> getAllInstruments() {
        this.LOGS.info("Fetching all instruments");
        return Optional.ofNullable(
                this.restTemplate.exchange("http://localhost:8080/instruments/all", HttpMethod.GET, null,
                        this.responseType).getBody())
                .map(RetrieveDTO::data)
                .orElse(List.of());
    }

    public InstrumentsDTO getInstrumentById(String id) {
        this.LOGS.info("Fetching instrument with id {}", id);
        return Objects.requireNonNull(
                this.restTemplate
                        .exchange("lb://INSTRUMENTS-SERVICE/instruments?id={id}", HttpMethod.GET, null,
                                this.responseType)
                        .getBody())
                .data()
                .getFirst();
    }
}
