package com.school.gatewayservice;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // 1. On autorise Angular (Port 4200)
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:4200"));

        // 2. On autorise toutes les méthodes (GET, POST, PUT, DELETE...)
        corsConfig.addAllowedMethod("*");

        // 3. On autorise tous les headers
        corsConfig.addAllowedHeader("*");

        // 4. On autorise les cookies/credentials
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}