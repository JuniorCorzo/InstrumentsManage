package io.github.juniorcorzo.tagsinstrumentsservice.common.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateBean {

    @Bean
    @LoadBalanced
    public RestTemplate restClient() {
        return new RestTemplate();
    }
}

