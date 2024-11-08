package io.github.juniorcorzo.InstrumentsService.brands.services;

import io.github.juniorcorzo.InstrumentsService.brands.models.Brands;
import io.github.juniorcorzo.InstrumentsService.brands.repositories.BrandsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandsService {
    private BrandsRepository brandsRepository;

    public List<Brands> getAllBrands(){
        return this.brandsRepository.findAll();
    }

    public Brands getBrandById(String id){
        return this.brandsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el id de esa marca"));
    }

    public void createBrand(Brands brands) {
        this.brandsRepository.save(brands);
    }

    public void deleteBrands(String id) {
        this.brandsRepository.deleteById(id);
    }
}
