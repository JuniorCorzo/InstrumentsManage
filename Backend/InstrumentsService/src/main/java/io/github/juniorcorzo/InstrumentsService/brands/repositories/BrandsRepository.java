package io.github.juniorcorzo.InstrumentsService.brands.repositories;

import io.github.juniorcorzo.InstrumentsService.brands.entity.BrandsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BrandsRepository extends MongoRepository<BrandsEntity, String> {
}
