package io.github.juniorcorzo.tagsinstrumentsservice.tags.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.ResponseWithData;
import io.github.juniorcorzo.tagsinstrumentsservice.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dto.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.models.Tags;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.services.TagsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

// TODO:: Añadir endpoint que devuelva tags por el nombre
@RestController
@RequestMapping("/tags")
@AllArgsConstructor
public class TagsController {
    private final TagsService tagsService;

    @GetMapping("/all")
    public ResponseWithData<Tags> getAllTags() {
        return this.tagsService.getAllTags();
    }

    @GetMapping
    public ResponseWithData<TagsResponse> getTagById(@RequestParam String id) {
        return this.tagsService.getTagById(id);
    }

    @PostMapping("/create")
    public ResponseWithoutData insertTag(@RequestBody Tags tag) {
        return this.tagsService.insertTag(tag);
    }

    @PutMapping("/update")
    public ResponseWithoutData updateTag(@RequestBody Tags tag) {
        return this.tagsService.updateTag(tag);
    }

    @DeleteMapping("/delete")
    public ResponseWithoutData deleteTag(@RequestParam String id){
        return this.tagsService.deleteTag(id);
    }
}

