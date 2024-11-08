package io.github.juniorcorzo.InstrumentsService.brands.repositories;

import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BrandsRepository extends MongoRepository<Brands, String> {
}
