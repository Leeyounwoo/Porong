package com.porong.gateway.config;

import lombok.Data;

@Data
public class Config {
    private String baseMessage;
    private boolean preLogger;
    private boolean postLogger;
}

// application.yml 에 선언한 각 filter 의 args (인자값) 사용을 위한 클래스
