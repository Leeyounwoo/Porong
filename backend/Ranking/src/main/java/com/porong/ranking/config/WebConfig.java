package com.porong.ranking.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://k6c102.p.ssafy.io:8888")
                .allowedOrigins("http://k6c102.p.ssafy.io:80")
                .allowedOrigins("http://k6c102.p.ssafy.io")
                .allowedOrigins("*")
                .allowedMethods("*");
    }

}
