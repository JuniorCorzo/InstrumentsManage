package io.github.juniorcorzo.tagsinstrumentsservice.tags.validations;

import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.enums.ResponseMessages;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions.FormatIdNotValid;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.exceptions.TagIdNotFound;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.repositories.TagsRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TagsValidations {
    private final TagsRepository tagsRepository;
    private final Logger LOGS = LoggerFactory.getLogger(TagsValidations.class);

    private void validId (String id) {
        if (!ObjectId.isValid(id)) {
            LOGS.error(ResponseMessages.ID_FORMAT_NOT_VALID.getMessage());
            throw new FormatIdNotValid();
        }
    }

    public void validIdWithTagExist(String id) {
        validId(id);

        if (!this.tagsRepository.existsById(id)){
            LOGS.error(ResponseMessages.TAG_ID_NOT_FOUND.getMessage());
            throw new TagIdNotFound();
        }
    }

}
