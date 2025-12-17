package com.school.notesservice.config; // Attention: vérifie que ce nom correspond bien à ton dossier

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Autorise toutes les URLs
                        .allowedOrigins("http://localhost:4200") // Autorise Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autorise tout
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}