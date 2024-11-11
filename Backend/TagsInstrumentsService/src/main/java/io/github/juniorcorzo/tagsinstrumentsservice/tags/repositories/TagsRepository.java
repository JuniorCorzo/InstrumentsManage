package io.github.juniorcorzo.tagsinstrumentsservice.tags.repositories;

import io.github.juniorcorzo.tagsinstrumentsservice.tags.models.Tags;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagsRepository extends MongoRepository<Tags, String> {
}
