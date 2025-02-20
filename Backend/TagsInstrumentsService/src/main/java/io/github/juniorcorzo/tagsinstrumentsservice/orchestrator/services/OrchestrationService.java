package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.IDataCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryInstrumentsCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.InMemoryUnitProcessCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.tasks.TaskExecutorContext;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class OrchestrationService {
    private final InMemoryInstrumentsCache instrumentsCache;
    private final InMemoryUnitProcessCache unitProcessCache;
    private final ExecutorService executorService;

    public OrchestrationService(InMemoryInstrumentsCache instrumentsCache, InMemoryUnitProcessCache unitProcessCache) {
        this.instrumentsCache = instrumentsCache;
        this.unitProcessCache = unitProcessCache;
        executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
    }

    public TagsResponse createResponse(TagsDTO tags) {
        TagsResponse tagsResponse;

        ObjectMapper mapper = new ObjectMapper();
        try {
            Future<InstrumentsDTO> instrument = this.submitTask(this.instrumentsCache, tags.idInstrument());
            Future<UnitProcessDTO> unitProcess = this.submitTask(this.unitProcessCache, tags.idUnitProcess());

            tagsResponse = mapper.readerForUpdating(
                    mapper.readValue(mapper.writeValueAsString(tags), TagsResponse.class)
            ).readValue(
                    String.format(
                            "{\"instrument\": %s, \"unitProcess\": %s}",
                            mapper.writeValueAsString(instrument.get()),
                            mapper.writeValueAsString(unitProcess.get())
                    )
            );
        } catch (JsonProcessingException | ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return tagsResponse;
    }

    public List<TagsResponse> createResponse(List<TagsDTO> tags) {
        return tags
                .stream()
                .map(this::createResponse)
                .toList();
    }


    private <T> Future<T> submitTask(IDataCache<T> context, String key) {
        return this.executorService.submit(new TaskExecutorContext<>(context, key));
    }
}

