package io.github.juniorcorzo.InstrumentsService.brands.services;

import io.github.juniorcorzo.InstrumentsService.brands.adapter.BrandAdapter;
import io.github.juniorcorzo.InstrumentsService.brands.dtos.BrandsDTO;
import io.github.juniorcorzo.InstrumentsService.brands.entity.BrandsEntity;
import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.brands.validations.BrandsValidations;
import io.github.juniorcorzo.InstrumentsService.instruments.entity.InstrumentsEntity;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class WriteBatchBrand {
    private final BrandsValidations brandsValidations;
    private final MongoTemplate mongoTemplate;

    private final Logger LOGS = LoggerFactory.getLogger(WriteBatchBrand.class);

    public WriteBatchBrand(BrandsValidations brandsValidations, MongoTemplate mongoTemplate) {
        this.brandsValidations = brandsValidations;
        this.mongoTemplate = mongoTemplate;
    }

    //TODO:: Refactor this method separating the logic of updating the brand name in the brands and instruments documents
    @Transactional
    public ResponseWithData<BrandsDTO> updateBrands(String idBrand, String newName) {
        LOGS.info("Updating brand name in the both brands and instruments documents");
        this.brandsValidations.validIdWithBrandExists(idBrand);

        BulkOperations bulkOperationsBrand = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, BrandsEntity.class);
        Query queryBrand = new Query(Criteria.where("_id").is(idBrand));
        Update updateBrand = new Update().set("name", newName);
        bulkOperationsBrand.updateOne(queryBrand, updateBrand);

        BulkOperations bulkOperationsInstruments = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED,
                InstrumentsEntity.class);
        bulkOperationsInstruments.updateOne(
                new Query(Criteria.where("brand.id").is(idBrand)),
                new Update().set("brand.name", newName));

        bulkOperationsBrand.execute();
        bulkOperationsInstruments.execute();

        BrandsDTO brandData = BrandAdapter.toDTO(
                Optional.ofNullable(
                        this.mongoTemplate.findById(idBrand, BrandsEntity.class)
                ).orElseThrow(BrandIdNotFound::new)
        );
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(brandData),
                ResponseMessages.OK.getMessage());
    }
}
