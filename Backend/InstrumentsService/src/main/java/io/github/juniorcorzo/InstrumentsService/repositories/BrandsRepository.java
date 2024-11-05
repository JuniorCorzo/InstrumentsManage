package io.github.juniorcorzo.InstrumentsService.repositories;

import io.github.juniorcorzo.InstrumentsService.models.Brands;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BrandsRepository extends MongoRepository<Brands, String> {
}
