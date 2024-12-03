package io.github.juniorcorzo.InstrumentsService.shared.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer configCors() {
        return new WebMvcConfigurer() {
            //TODO:: Change this to allow only the connection at gateway
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/instruments/**")
                        .allowedOrigins("*");
            }
        };
    }
}

