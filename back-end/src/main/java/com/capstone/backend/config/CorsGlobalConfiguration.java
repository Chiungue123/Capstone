package com.capstone.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsGlobalConfiguration {

	/*
	@Bean
    public CorsFilter corsFilter() {
		System.out.println("================================");
		System.out.println("Custom CORS Configuration Loaded");
		System.out.println("================================");
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        //config.addAllowedOriginPattern("*"); // Use this instead of setAllowedOrigins for more flexibility
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply CORS configuration to all paths

        return new CorsFilter(source);
    }
	*/
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
		System.out.println("================================");
		System.out.println("Custom WebMvcConfigurer Loaded");
		System.out.println("================================");
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowedHeaders("*");
            }
        };
	}
}