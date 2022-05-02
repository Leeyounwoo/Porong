package com.porong.gateway.filter;

import com.porong.gateway.config.Config;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class GlobalFilter extends AbstractGatewayFilterFactory<Config> {

    // Gateway 를 구현하기 위해서는 GatewayFilterFactory 를 구현해야 하며,
    // 상속할 수 있는 추상 클래스가 AbstractGatewayFilterFactory

    private static final Logger logger = LogManager.getLogger(GlobalFilter.class);

    public GlobalFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        
        // exchange : 서비스 요청/응답값을 담고 있는 변수로, 요청/응답값을 출력하거나 변환할 때 사용한다

        // (exchange, chain) -> 구문 후에 요청값을 얻을 수 있으며
        // Mono.fromRunnable(()-> 구문 이후부터 서비스로부터 리턴받은 응답값을 얻을 수 있다

        // config : application.yml 에 선언한 각 filter dml args(인자값) 사용을 위한 클래스
        
        return ((exchange, chain) -> {
            logger.info("GlobalFilter baseMessage>>>>>>" + config.getBaseMessage());
            if (config.isPreLogger()) {
                logger.info("GlobalFilter Start>>>>>>" + exchange.getRequest());
            }
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                if (config.isPostLogger()) {
                    logger.info("GlobalFilter End>>>>>>" + exchange.getResponse());
                }
            }));
        });
    }
}
