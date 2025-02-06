package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.common.dto.RetrieveDTO;

@Service
public class UnitProcessService {
	private final RestTemplate restTemplate;
	private final ParameterizedTypeReference<RetrieveDTO<UnitProcessDTO>> responseType;

	public UnitProcessService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
		this.responseType = new ParameterizedTypeReference<>() {
		};
	}

	public List<UnitProcessDTO> getAllUnitProcess() {
		return Optional.ofNullable(
				this.restTemplate
						.exchange("lb://UNIT-PROCESS-SERVICE/unit-process/all", HttpMethod.GET, null, this.responseType)
						.getBody())
				.map(RetrieveDTO::data)
				.orElse(List.of());
	}

	public UnitProcessDTO getUnitProcessById(String idUnitProcess) {
		return Optional.ofNullable(
				this.restTemplate
						.exchange("lb://UNIT-PROCESS-SERVICE/unit-process?id=:id", HttpMethod.GET, null,
								this.responseType, idUnitProcess)
						.getBody())
				.get()
				.data()
				.getFirst();
	}
}
