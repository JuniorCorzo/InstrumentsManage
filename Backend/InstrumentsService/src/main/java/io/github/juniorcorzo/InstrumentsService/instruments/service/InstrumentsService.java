package io.github.juniorcorzo.InstrumentsService.instruments.service;

import io.github.juniorcorzo.InstrumentsService.instruments.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.instruments.repositories.InstrumentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InstrumentsService {
    private InstrumentsRepository instrumentsRepository;

    public List<Instruments> getAll() {
        return this.instrumentsRepository.findAll();
    }

    public Instruments getById(String id){
        return this.instrumentsRepository.findById(id).orElseThrow(() -> new RuntimeException("No existe un istrumento con ese id"));
    }

    public void createInstruments(Instruments instruments){
        this.instrumentsRepository.insert(instruments);
    }

    public void updateInstruments(Instruments instruments){
        this.instrumentsRepository.save(instruments);
    }

    public void deleteInstruments(String id) {
        this.instrumentsRepository.deleteById(id);
    }
}
