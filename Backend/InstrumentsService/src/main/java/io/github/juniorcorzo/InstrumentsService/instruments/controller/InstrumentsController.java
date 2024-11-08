package io.github.juniorcorzo.InstrumentsService.instruments.controller;

import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.service.InstrumentsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instruments")
@AllArgsConstructor
@CrossOrigin("*")
public class InstrumentsController {
    private InstrumentsService instrumentsService;

    @GetMapping("/all")
    public List<Instruments> getAll() {
        return this.instrumentsService.getAll();
    }

    @GetMapping()
    public Instruments getById(@RequestParam String id){
        System.out.println(id);
        return this.instrumentsService.getById(id);
    }

    @PostMapping("/create")
    public void createInstruments(@RequestBody Instruments instruments) {
        this.instrumentsService.createInstruments(instruments);
    }

    @PutMapping("/update")
    public void updateInstruments(@RequestBody Instruments instruments) {
        this.instrumentsService.updateInstruments(instruments);
    }

    @DeleteMapping("/delete")
    public void deleteInstruments(@RequestParam String id){
        this.instrumentsService.deleteInstruments(id);
    }
}
