package io.github.juniorcorzo.InstrumentsService.brands.controllers;

import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.services.BrandsService;
import io.github.juniorcorzo.InstrumentsService.brands.services.WriteBatchBrand;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
@AllArgsConstructor
@CrossOrigin("*")
public class BrandsController {
    private BrandsService brandsService;
    private WriteBatchBrand writeBatchBrand;

    @GetMapping("/all")
    public List<Brands> getAllBrands(){
        return this.brandsService.getAllBrands();
    }

    @GetMapping
    public Brands getBrandById(@RequestParam String id){
        return this.brandsService.getBrandById(id);
    }

    @PostMapping("/create")
    public void createBrand(@RequestBody Brands brand){
        this.brandsService.createBrand(brand);
    }

    @PutMapping("/update")
    public void updateBrand(@RequestParam String id, @RequestParam String newName){
        this.writeBatchBrand.updateBrands(id, newName);
    }
    @DeleteMapping("/delete")
    public void deleteBrand(@RequestParam String id) {
        this.brandsService.deleteBrands(id);
    }
}
