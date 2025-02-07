package io.github.juniorcorzo.tagsinstrumentsservice.tags.controllers;

import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithData;
import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.ResponseWithoutData;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.dtos.TagsResponse;
import io.github.juniorcorzo.tagsinstrumentsservice.tags.services.TagsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

// TODO:: Add endpoint for return to by name
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
    public ResponseWithData<TagsResponse> insertTag(@RequestBody TagsDTO tag) {
        return this.tagsService.insertTag(tag);
    }

    @PutMapping("/update")
    public ResponseWithData<TagsResponse> updateTag(@RequestBody TagsDTO tag) {
        return this.tagsService.updateTag(tag);
    }

    @DeleteMapping("/delete")
    public ResponseWithoutData deleteTag(@RequestParam String id){
        return this.tagsService.deleteTag(id);
    }
}

