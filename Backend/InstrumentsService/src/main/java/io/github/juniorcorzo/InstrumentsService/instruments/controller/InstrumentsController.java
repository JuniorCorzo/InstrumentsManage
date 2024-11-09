package io.github.juniorcorzo.InstrumentsService.instruments.controller;

import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.service.InstrumentsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instruments")
@AllArgsConstructor
@CrossOrigin("*")
public class InstrumentsController {
    private InstrumentsService instrumentsService;

    @GetMapping("/all")
    public ResponseWithData<Instruments> getAll() {
        return this.instrumentsService.getAll();
    }

    @GetMapping()
    public ResponseWithData<Instruments> getById(@RequestParam String id){
        return this.instrumentsService.getById(id);
    }

    @PostMapping("/create")
    public ResponseWithoutData createInstruments(@RequestBody Instruments instruments) {
        return this.instrumentsService.createInstruments(instruments);
    }

    @PutMapping("/update")
    public ResponseWithoutData updateInstruments(@RequestBody Instruments instruments) {
        return this.instrumentsService.updateInstruments(instruments);
    }

    @DeleteMapping("/delete")
    public ResponseWithoutData deleteInstruments(@RequestParam String id){
        return this.instrumentsService.deleteInstruments(id);
    }
}
