package io.github.juniorcorzo.InstrumentsService.brands.services;

import io.github.juniorcorzo.InstrumentsService.brands.adapter.BrandAdapter;
import io.github.juniorcorzo.InstrumentsService.brands.dtos.BrandsDTO;
import io.github.juniorcorzo.InstrumentsService.brands.exceptions.BrandIdNotFound;
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
import java.util.List;

@Service
@AllArgsConstructor
public class BrandsService {
    private final BrandsRepository brandsRepository;
    private final BrandsValidations brandsValidations;

    private final Logger LOGS = LoggerFactory.getLogger(BrandsService.class);

    public ResponseWithData<BrandsDTO> getAllBrands() {
        LOGS.info("Fetching all brands");
        List<BrandsDTO> brandsData =
                this.brandsRepository.findAll()
                        .stream()
                        .map(BrandAdapter::toDTO)
                        .toList();

        return new ResponseWithData<>(
                HttpStatus.OK,
                brandsData,
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<BrandsDTO> getBrandById(String id) {
        LOGS.info("Fetching brand with id {}", id);
        this.brandsValidations.validIdWithBrandExists(id);
        BrandsDTO brandData = BrandAdapter.toDTO(
                this.brandsRepository.findById(id)
                        .orElseThrow(BrandIdNotFound::new)
        );

        return new ResponseWithData<>(
                HttpStatus.OK,
                Collections.singletonList(brandData),
                ResponseMessages.OK.getMessage()
        );
    }

    public ResponseWithData<BrandsDTO> createBrand(BrandsDTO brands) {
        LOGS.info("Inserting a new brand");
        BrandsDTO brandData = BrandAdapter.toDTO(
                this.brandsRepository.save(BrandAdapter.toEntity(brands))
        );

        return new ResponseWithData<>(
                HttpStatus.CREATED,
                Collections.singletonList(brandData),
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
