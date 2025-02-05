package io.github.juniorcorzo.InstrumentsService.instruments.repositories;

import io.github.juniorcorzo.InstrumentsService.instruments.entity.InstrumentsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstrumentsRepository extends MongoRepository<InstrumentsEntity, String> {
}
