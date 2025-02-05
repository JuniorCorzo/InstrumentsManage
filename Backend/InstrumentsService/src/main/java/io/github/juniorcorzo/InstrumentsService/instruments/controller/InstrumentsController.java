package io.github.juniorcorzo.InstrumentsService.instruments.controller;

import io.github.juniorcorzo.InstrumentsService.instruments.dtos.InstrumentsDTO;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithData;
import io.github.juniorcorzo.InstrumentsService.shared.dto.ResponseWithoutData;
import io.github.juniorcorzo.InstrumentsService.instruments.service.InstrumentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instruments")
@AllArgsConstructor
public class InstrumentsController {
    private InstrumentsService instrumentsService;

    @GetMapping("/all")
    public ResponseWithData<InstrumentsDTO> getAll() {
        return this.instrumentsService.getAll();
    }

    @GetMapping()
    public ResponseWithData<InstrumentsDTO> getById(@RequestParam String id){
        return this.instrumentsService.getById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseWithData<InstrumentsDTO> createInstruments(@RequestBody InstrumentsDTO instrumentsDTO) {
        return this.instrumentsService.createInstruments(instrumentsDTO);
    }

    @PutMapping("/update")
    public ResponseWithData<InstrumentsDTO> updateInstruments(@RequestBody InstrumentsDTO instrumentsDTO) {
        return this.instrumentsService.updateInstruments(instrumentsDTO);
    }

    @DeleteMapping("/delete")
    public ResponseWithoutData deleteInstruments(@RequestParam String id){
        return this.instrumentsService.deleteInstruments(id);
    }
}
