package io.github.juniorcorzo.InstrumentsService.brands.services;

import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.exception.FormatIdNotValid;
import io.github.juniorcorzo.InstrumentsService.utils.ResponseMessages;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class BrandsService {
    private BrandsRepository brandsRepository;

    public ResponseWithData<Brands> getAllBrands(){
        return new ResponseWithData<>(
                HttpStatus.OK,
                this.brandsRepository.findAll(),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<Brands> getBrandById(String id){
        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(this.brandsRepository.findById(id)
                        .orElseThrow(BrandIdNotFound::new)),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData createBrand(Brands brands) {
        this.brandsRepository.save(brands);

        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithoutData deleteBrands(String id) {
        if (!ObjectId.isValid(id)) throw new FormatIdNotValid();
        if (!this.brandsRepository.existsById(id)) throw new BrandIdNotFound();

        this.brandsRepository.deleteById(id);
        return new ResponseWithoutData(
                HttpStatus.OK,
                ResponseMessages.OK.getMessage()
        );
    }
}
