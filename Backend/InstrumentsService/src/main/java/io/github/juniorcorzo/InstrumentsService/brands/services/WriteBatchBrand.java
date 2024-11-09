package io.github.juniorcorzo.InstrumentsService.brands.services;


import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import io.github.juniorcorzo.InstrumentsService.brands.validations.BrandsValidations;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class WriteBatchBrand {
    private final BrandsRepository brandsRepository;
    private final InstrumentsRepository instrumentsRepository;
    private final BrandsValidations brandsValidations;
    private final MongoTemplate mongoTemplate;

    private final Logger LOGS = LoggerFactory.getLogger(WriteBatchBrand.class);


    @Autowired
    public WriteBatchBrand(BrandsRepository brandsRepository, InstrumentsRepository instrumentsRepository, BrandsValidations brandsValidations, MongoTemplate mongoTemplate) {
        this.brandsRepository = brandsRepository;
        this.instrumentsRepository = instrumentsRepository;
        this.brandsValidations = brandsValidations;
        this.mongoTemplate = mongoTemplate;
    }

    @Transactional
    public ResponseWithoutData updateBrands(String idBrand, String newName){
        LOGS.info("Updating brand name in the both brands and instruments documents");
        this.brandsValidations.validIdWithBrandExists(idBrand);

        BulkOperations bulkOperationsBrand = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, Brands.class);
        Query queryBrand = new Query(Criteria.where("_id").is(idBrand));
        Update updateBrand = new Update().set("name", newName);
        bulkOperationsBrand.updateOne(queryBrand, updateBrand);
        bulkOperationsBrand.execute();

        BulkOperations bulkOperationsInstruments = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, Instruments.class);
        bulkOperationsInstruments.updateMulti(
            new Query(Criteria.where("brand.id").is(idBrand)),
            new Update().set("brand.name", newName)
        );
        bulkOperationsInstruments.execute();

        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }
}
