package io.github.juniorcorzo.InstrumentsService.brands.services;

import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import io.github.juniorcorzo.InstrumentsService.brands.validations.BrandsValidations;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.shared.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class BrandsService {
    private final BrandsRepository brandsRepository;
    private final BrandsValidations brandsValidations;

    private final Logger LOGS = LoggerFactory.getLogger(BrandsService.class);

    public ResponseWithData<Brands> getAllBrands() {
        LOGS.info("Fetching all brands");

        return new ResponseWithData<>(
                HttpStatus.OK,
                this.brandsRepository.findAll(),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<Brands> getBrandById(String id) {
        LOGS.info("Fetching brand with id {}", id);
        this.brandsValidations.validIdWithBrandExists(id);

        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(this.brandsRepository.findById(id)
                        .orElseThrow(BrandIdNotFound::new)),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData createBrand(Brands brands) {
       LOGS.info("Inserting a new brand");
        this.brandsRepository.save(brands);

        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData deleteBrands(String id) {
        LOGS.info("Deleting brand with id {}", id);
        this.brandsValidations.validIdWithBrandExists(id);

        this.brandsRepository.deleteById(id);
        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }
}
