package com.porong.gateway.filter;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.porong.gateway.config.Config;
import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 로직 설명
 * 8080/member 에 접근할 때 AuthFilter 를 거치게 하기 위해서 작성
 * 서비스 접근 전, 서비스에 가입한 유효한 사용자 (= auth database 에서 조회 가능한 사용자) 인지 확인 (8082/oauth/access/check 에서)
  */

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private static final Logger logger = LogManager.getLogger(AuthFilter.class);
    private static final String reqURL = "http://localhost:8082/oauth/signup";

    // "http://localhost:8082/oauth/signup";
    // "http://k6C102.p.ssafy.io:8082/oauth/access/check";

    public AuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {

        // 여기에 토큰 검증 로직 추가

        return ((exchange, chain) -> {

            // about SCG 구현
            // https://otrodevym.tistory.com/entry/spring-boot-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-20-spring-cloud-gateway1-%EC%84%A4%EC%A0%95-%EB%B0%8F-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%86%8C%EC%8A%A4
            // https://wonit.tistory.com/500

            // Header 가져오기
            ServerHttpRequest request = exchange.getRequest();
            HttpHeaders headers = request.getHeaders();

            // Header 에서 데이터 (Access Token) 가져오기
            String token = headers.getFirst("AccessToken");
            logger.info("AccessToken : " + token);
            
            // json 형식 데이터 선언
            String json = "{\"accessToken\": \""+token+"\"}";
            logger.info("json : " + json);

            // HttpURLConnection 을 사용해 post body json 방식 데이터 요청하고 응답코드 받기
            if(!httpPostBodyConnection(reqURL, json)){
                return handleUnAuthorized(exchange); // 401 Error
            }

            // apply sample code
            logger.info("AuthFilter baseMessage>>>>>>" + config.getBaseMessage());
            if (config.isPreLogger()) {
                logger.info("AuthFilter Start>>>>>>" + exchange.getRequest());
            }
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                if (config.isPostLogger()) {
                    logger.info("AuthFilter End>>>>>>" + exchange.getResponse());
                }
            }));
        });
    }

    public static boolean httpPostBodyConnection(String UrlData, String ParamData) {

        // https://kkh0977.tistory.com/562
        // HttpURLConnection 사용해 post body json 방식 데이터 요청 및 응답 값 확인

        //http 요청 시 필요한 url 주소를 변수 선언
        String totalUrl = "";
        totalUrl = UrlData.trim().toString();

        //http 통신을 하기위한 객체 선언 실시
        URL url = null;
        HttpURLConnection conn = null;

        //http 통신 요청 후 응답 받은 데이터를 담기 위한 변수
        String responseData = "";
        BufferedReader br = null;
        StringBuffer sb = null;
        String result = "";

        //메소드 호출 결과값을 반환하기 위한 변수
        String returnData = "";
        String responseCode = "";

        try {

            //파라미터로 들어온 url을 사용해 connection 실시
            url = new URL(totalUrl);
            conn = (HttpURLConnection) url.openConnection();

            //http 요청에 필요한 타입 정의 실시
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8"); //post body json 으로 던지기 위함
//            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true); //OutputStream 을 사용해서 post body 데이터 전송
            try (OutputStream os = conn.getOutputStream()){
                byte request_data[] = ParamData.getBytes("utf-8");
                os.write(request_data);
                os.close();
            }
            catch(Exception e) {
                e.printStackTrace();
            }

            //http 요청 실시
            conn.connect();

            //http 요청 후 응답 받은 데이터를 버퍼에 쌓는다
            br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            sb = new StringBuffer();
            while ((responseData = br.readLine()) != null) {
                sb.append(responseData); //StringBuffer에 응답받은 데이터 순차적으로 저장 실시
            }

            //메소드 호출 완료 시 반환하는 변수에 버퍼 데이터 삽입 실시
            returnData = sb.toString();

            //http 요청 응답 코드 확인 실시
            responseCode = String.valueOf(conn.getResponseCode());
            System.out.println("http 응답 코드 : "+responseCode);
            System.out.println("http 응답 데이터 : "+returnData);

            // returnData Parsing
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(returnData);
            result = element.getAsJsonObject().get("result").getAsString();


        } catch (IOException e) {
            e.printStackTrace();

        } finally {
            //http 요청 및 응답 완료 후 BufferedReader 를 닫아줍니다
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return result.equals("success")? true : false;
        }
    }

    private Mono<Void> handleUnAuthorized(ServerWebExchange exchange){
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    @Data
    public static class Config{
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;
    }

}
