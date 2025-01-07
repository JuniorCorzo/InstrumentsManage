package io.github.juniorcorzo.tagsinstrumentsservice.tags.controllers;

import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithData;
import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithoutData;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
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
    public ResponseWithData<TagsResponse> getAllTags() {
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

