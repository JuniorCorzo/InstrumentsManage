package io.github.juniorcorzo.tagsinstrumentsservice.tags.services;

import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithData;
import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithoutData;
import io.github.juniorcorzo.tagsinstrumentsservice.common.enums.ResponseMessages;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.OrchestrationService;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.TagsAdapter;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.entity.TagsEntity;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions.TagIdNotFound;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.repositories.TagsRepository;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.validations.TagsValidations;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class TagsService {
    private final TagsRepository tagsRepository;
    private final OrchestrationService orchestrationService;
    private final TagsValidations tagsValidations;
    private final Logger LOGS = LoggerFactory.getLogger(TagsService.class);

    public ResponseWithData<TagsResponse> getAllTags() {
        this.LOGS.info("Fetching all tags");

        List<TagsDTO> allTags =
                this.tagsRepository
                        .findAll()
                        .stream()
                        .map(TagsAdapter::toDTO)
                        .toList();

        List<TagsResponse> responseData = this.orchestrationService.createResponse(allTags);
        return new ResponseWithData<>(
                HttpStatus.OK,
                responseData,
                ResponseMessages.OK.getMessage());
    }

    public ResponseWithData<TagsResponse> getTagById(String id) {
        this.LOGS.info("Fetching tag with id {}", id);
        this.tagsValidations.validIdWithTagExist(id);

        TagsDTO tagData = TagsAdapter.toDTO(
                this.tagsRepository
                        .findById(id)
                        .orElseThrow(TagIdNotFound::new)
        );
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(
                        this.orchestrationService
                                .createResponse(tagData)
                ),
                ResponseMessages.OK.getMessage());
    }

    public ResponseWithData<TagsResponse> insertTag(TagsDTO tag) {
        this.LOGS.info("Inserting a new Tag");
        TagsDTO tagCreated = TagsAdapter.toDTO(
                this.tagsRepository.save(TagsAdapter.toEntity(tag))
        );
        TagsResponse responseTag = this.orchestrationService.createResponse(tagCreated);
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(responseTag),
                ResponseMessages.OK.getMessage());
    }

    public ResponseWithData<TagsResponse> updateTag(TagsDTO tag) {
        this.LOGS.info("Updating the tag with id {}", tag.id());
        this.tagsValidations.validIdWithTagExist(tag.id());

        TagsDTO updateTag = TagsAdapter.toDTO(
                this.tagsRepository.save(TagsAdapter.toEntity(tag))
        );
        TagsResponse responseTag = this.orchestrationService.createResponse(updateTag);
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(responseTag),
                ResponseMessages.OK.getMessage());
    }

    public ResponseWithoutData deleteTag(String id) {
        this.LOGS.info("Deleting the tag with id {}", id);
        this.tagsValidations.validIdWithTagExist(id);

        this.tagsRepository.deleteById(id);
        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage());
    }

}