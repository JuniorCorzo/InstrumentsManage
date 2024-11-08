package io.github.juniorcorzo.InstrumentsService.instruments.repositories;

import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstrumentsRepository extends MongoRepository<Instruments, String> {
}
