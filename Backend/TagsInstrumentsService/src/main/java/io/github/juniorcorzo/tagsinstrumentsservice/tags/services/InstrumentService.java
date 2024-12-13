package io.github.juniorcorzo.tagsinstrumentsservice.tags.services;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.RetrieveDTO;
import org.apache.http.entity.ContentType;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Objects;

@Service
public class InstrumentService {
    @LoadBalanced
    private final RestClient restClient;

    public InstrumentService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("http://localhost:8081/")
                .defaultHeader("Content-Type", ContentType.APPLICATION_JSON.toString())
                .build();

    }
    //FIX:: Recuerda crear un dto que tenga encuenta lo que se resive de la api PENDEJO
    public InstrumentsDTO getInstrumentById(String id){
        return Objects.requireNonNull(this.restClient.get()
                        .uri("instruments?id={id}", id)
                        .retrieve()
                        .body(RetrieveDTO.class))
                .data()
                .getFirst();
    }
}


