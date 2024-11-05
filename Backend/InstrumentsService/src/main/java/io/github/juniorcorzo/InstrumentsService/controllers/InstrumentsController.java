package io.github.juniorcorzo.InstrumentsService.controllers;

import io.github.juniorcorzo.InstrumentsService.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.repositories.InstrumentsRepository;
import io.github.juniorcorzo.InstrumentsService.services.InstrumentsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/instruments")
@AllArgsConstructor
@CrossOrigin("*")
public class InstrumentsController {
    private InstrumentsService instrumentsService;

    @GetMapping("/")
    public List<Instruments> getAll(){
        return this.instrumentsService.getAll();
    }
}
