package io.github.juniorcorzo.tagsinstrumentsservice.tags.services;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.RetrieveDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Service
public class InstrumentService {
    private final RestTemplate restTemplate;

    @Autowired
    public InstrumentService(@Qualifier("FOR_INSTRUMENTS_SERVICE") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;

    }

    public InstrumentsDTO getInstrumentById(String id) {
        return Objects.requireNonNull(
                this.restTemplate
                        .getForObject("lb://INSTRUMENTS-SERVICE/instruments?id={id}", RetrieveDTO.class, id))
                .data()
                .getFirst();
    }
}


