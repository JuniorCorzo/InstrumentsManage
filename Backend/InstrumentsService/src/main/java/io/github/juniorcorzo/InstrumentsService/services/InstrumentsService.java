package io.github.juniorcorzo.InstrumentsService.services;

import io.github.juniorcorzo.InstrumentsService.models.Instruments;
import io.github.juniorcorzo.InstrumentsService.repositories.InstrumentsRepository;
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
}
