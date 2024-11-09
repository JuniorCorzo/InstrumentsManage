package io.github.juniorcorzo.InstrumentsService.brands.services;


import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.exception.FormatIdNotValid;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
public class WriteBatchBrand {
    private BrandsRepository brandsRepository;
    private InstrumentsRepository instrumentsRepository;
    private MongoTemplate mongoTemplate;

    @Transactional
    public ResponseWithoutData updateBrands(String idBrand, String newName){
        if (!ObjectId.isValid(idBrand)) throw new FormatIdNotValid();
        if (!this.brandsRepository.existsById(idBrand)) throw new BrandIdNotFound();

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
