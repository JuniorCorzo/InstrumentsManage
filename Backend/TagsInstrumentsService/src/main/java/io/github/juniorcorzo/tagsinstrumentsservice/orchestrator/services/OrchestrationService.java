package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.IDataContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.InMemoryInstrumentsContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.InMemoryUnitProcessContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context.TaskExecutorContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.models.Tags;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class OrchestrationService {
    private final InMemoryInstrumentsContext instrumentsContext;
    private final InMemoryUnitProcessContext unitProcessContext;
    private final ExecutorService executorService;

    public OrchestrationService(InMemoryInstrumentsContext instrumentsContext, InMemoryUnitProcessContext unitProcessContext) {
        this.instrumentsContext = instrumentsContext;
        this.unitProcessContext = unitProcessContext;
        executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    }

    public TagsResponse createResponse(Tags tags) {
        TagsResponse tagsResponse;

        ObjectMapper mapper = new ObjectMapper();
        try {
            Future<InstrumentsDTO> instruments = this.submitTask(this.instrumentsContext, tags.getIdInstruments());
            Future<UnitProcessDTO> unitProcess = this.submitTask(this.unitProcessContext, tags.getUnitProcess());

            tagsResponse = mapper.readerForUpdating(
                    mapper.readValue(mapper.writeValueAsString(tags), TagsResponse.class)
            ).readValue(
                    String.format(
                            "{\"instruments\": %s, \"unitProcess\": %s}",
                            mapper.writeValueAsString(instruments.get()),
                            mapper.writeValueAsString(unitProcess.get())
                    )
            );

        } catch (JsonProcessingException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return tagsResponse;
    }

    private <T> Future<T> submitTask(IDataContext<T> context, String key) {
        return this.executorService.submit(new TaskExecutorContext<>(context, key));
    }


}

