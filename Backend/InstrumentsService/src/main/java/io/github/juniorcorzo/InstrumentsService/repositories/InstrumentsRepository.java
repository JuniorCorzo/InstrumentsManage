package io.github.juniorcorzo.InstrumentsService.repositories;

import io.github.juniorcorzo.InstrumentsService.models.Instruments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstrumentsRepository extends MongoRepository<Instruments, String> {
}
