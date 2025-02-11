package io.github.juniorcorzo.InstrumentsService.brands.controllers;

import io.github.juniorcorzo.InstrumentsService.brands.dtos.BrandsDTO;
import io.github.juniorcorzo.InstrumentsService.brands.services.BrandsService;
import io.github.juniorcorzo.InstrumentsService.brands.services.WriteBatchBrand;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/brands")
@AllArgsConstructor
public class BrandsController {
    private BrandsService brandsService;
    private WriteBatchBrand writeBatchBrand;

    @GetMapping("/all")
    public ResponseWithData<BrandsDTO> getAllBrands(){
        return this.brandsService.getAllBrands();
    }

    @GetMapping
    public ResponseWithData<BrandsDTO> getBrandById(@RequestParam String id){
        return this.brandsService.getBrandById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseWithData<BrandsDTO> createBrand(@RequestBody BrandsDTO brand){
       return this.brandsService.createBrand(brand);
    }

    @PutMapping("/update")
    public ResponseWithData<BrandsDTO> updateBrand(@RequestParam String id, @RequestParam String newName){
        return this.writeBatchBrand.updateBrands(id, newName);
    }
    @DeleteMapping("/delete")
    public ResponseWithoutData deleteBrand(@RequestParam String id) {
        return this.brandsService.deleteBrands(id);
    }
}
