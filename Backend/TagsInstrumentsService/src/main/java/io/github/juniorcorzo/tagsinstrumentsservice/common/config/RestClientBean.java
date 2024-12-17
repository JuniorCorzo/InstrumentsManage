package io.github.juniorcorzo.tagsinstrumentsservice.common.config;

import org.apache.http.entity.ContentType;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestClientBean {

    @Bean("FOR_INSTRUMENTS_SERVICE")
    @LoadBalanced
    public RestTemplate restClient() {
        return new RestTemplate();
    }
}

