package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.TaskExecutorContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.InMemoryInstrumentsContext;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.models.Tags;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class OrchestrationService {

    private final InMemoryInstrumentsContext instrumentsContext;

    public OrchestrationService(InMemoryInstrumentsContext instrumentsContext) {
        this.instrumentsContext = instrumentsContext;
    }

    public TagsResponse createResponse(Tags tags) {

        try {
            ExecutorService instrumentsExecutorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
            System.out.println(instrumentsExecutorService.submit(new TaskExecutorContext<>(this.instrumentsContext, tags.getIdInstruments())).get());
            instrumentsExecutorService.shutdown();
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }


        TagsResponse tagsResponse;

        ObjectMapper mapper = new ObjectMapper();
        try {
            tagsResponse = mapper.readerForUpdating(
                    mapper.readValue(
                            mapper.writeValueAsString(tags),
                            TagsResponse.class))
                    .readValue(
                            "{\"instruments\":"
                                    .concat(mapper
                                            .writeValueAsString(this.instrumentsContext.get(tags.getIdInstruments())))
                                    .concat("}"));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return tagsResponse;
    }
}
