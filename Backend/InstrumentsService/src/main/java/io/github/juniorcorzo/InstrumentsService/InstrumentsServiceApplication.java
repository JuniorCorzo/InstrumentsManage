package io.github.juniorcorzo.InstrumentsService;

import io.github.juniorcorzo.InstrumentsService.repositories.InstrumentsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@SpringBootApplication
public class InstrumentsServiceApplication {


	public static void main(String[] args) {
		SpringApplication.run(InstrumentsServiceApplication.class, args);
	}
}
