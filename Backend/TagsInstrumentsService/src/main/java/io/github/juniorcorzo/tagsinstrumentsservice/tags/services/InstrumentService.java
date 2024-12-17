package io.github.juniorcorzo.tagsinstrumentsservice.tags.services;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.RetrieveDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@Service
public class InstrumentService {
    private final RestTemplate restTemplate;
    private final Logger LOGS = LoggerFactory.getLogger(InstrumentService.class);

    @Autowired
    public InstrumentService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<InstrumentsDTO> getAllInstruments() {
        this.LOGS.info("Fetching all instruments");
        return Objects.requireNonNull(
                        this.restTemplate
                                .getForObject("lb://INSTRUMENTS-SERVICE/instruments/all", RetrieveDTO.class)
                )
                .data();
    }

    public InstrumentsDTO getInstrumentById(String id) {
        this.LOGS.info("Fetching instrument with id {}", id);
        return Objects.requireNonNull(
                        this.restTemplate
                                .getForObject("lb://INSTRUMENTS-SERVICE/instruments?id={id}", RetrieveDTO.class, id))
                .data()
                .getFirst();
    }
}


