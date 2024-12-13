package io.github.juniorcorzo.tagsinstrumentsservice.tags.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.ResponseWithData;
import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.enums.ResponseMessages;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions.TagIdNotFound;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.models.Tags;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.repositories.TagsRepository;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.validations.TagsValidations;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;
    private final InstrumentService instrumentService;
    private final TagsValidations tagsValidations;
    private final Logger LOGS = LoggerFactory.getLogger(TagsService.class);


    public ResponseWithData<Tags> getAllTags() {
        this.LOGS.info("Fetching all tags");


        return new ResponseWithData<>(
                HttpStatus.OK,
                this.tagsRepository.findAll(),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<TagsResponse> getTagById(String id) {
        this.LOGS.info("Fetching tag with id {}", id);
        this.tagsValidations.validIdWithTagExist(id);

        Tags tagById = this.tagsRepository.findById(id)
                .orElseThrow(TagIdNotFound::new);
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections
                        .singletonList(createResponse(
                                tagById,
                                this.instrumentService
                                        .getInstrumentById(tagById.getInstruments())
                                )
                        ),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData insertTag(Tags tag) {
        this.LOGS.info("Inserting a new Tag");
        this.tagsRepository.save(tag);

        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData updateTag(Tags tag) {
        this.LOGS.info("Updating the tag with id {}", tag.getTag());
        this.tagsValidations.validIdWithTagExist(tag.getId());

        this.tagsRepository.save(tag);
        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData deleteTag(String id) {
        this.LOGS.info("Deleting the tag with id {}", id);
        this.tagsValidations.validIdWithTagExist(id);

        this.tagsRepository.deleteById(id);
        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }

    private TagsResponse createResponse(Tags tags, InstrumentsDTO instruments) {
        TagsResponse tagsResponse;

        ObjectMapper mapper = new ObjectMapper();
        try {
            tagsResponse = mapper.readerForUpdating(
                    mapper.readValue(
                            mapper.writeValueAsString(tags),
                            TagsResponse.class
                    )
            ).readValue(
                    "{\"instruments\":"
                            .concat(mapper.writeValueAsString(instruments))
                            .concat("}")
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return tagsResponse;
    }
}