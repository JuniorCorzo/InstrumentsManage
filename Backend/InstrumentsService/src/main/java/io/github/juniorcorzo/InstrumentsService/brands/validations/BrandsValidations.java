package io.github.juniorcorzo.InstrumentsService.brands.validations;

import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import io.github.juniorcorzo.InstrumentsService.shared.exception.FormatIdNotValid;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BrandsValidations {
    private final BrandsRepository brandsRepository;
    private final Logger LOGS = LoggerFactory.getLogger(BrandsValidations.class);

    private void validIdFormat(String id){
        if (!ObjectId.isValid(id)){
            LOGS.error("Id is not valid");
            throw new FormatIdNotValid();
        }
    }

    public void validIdWithBrandExists(String id){
        validIdFormat(id);
        if (!this.brandsRepository.existsById(id)){
            LOGS.error("Brand with id {} not found", id);
            throw new BrandIdNotFound();
        }
    }
}
