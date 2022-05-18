package com.porong.ranking.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.porong.ranking.component.RankingZset;
import com.porong.ranking.repository.LocationRedisRepository;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class LocationService {

    @Autowired
    LocationRedisRepository locationRedisRepository;

    @Autowired
    private final RedisTemplate<String,String> redisTemplate = new RedisTemplate<>();
    @Autowired
    RankingZset rankingZset = new RankingZset(redisTemplate);

    @Transactional
    public void countLocation(String locationName) {
            rankingZset.locationCount(locationName);
        }

    public List<String> getDaliyRanking() {
        return rankingZset.getLocation();
    }


    public String getlocation(String coordinate) {

        try {
            HttpClient client = HttpClientBuilder.create().build();
            HttpGet getRequest = new HttpGet("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords="+coordinate+"&output=json&orders=admcode");
            getRequest.setHeader("X-NCP-APIGW-API-KEY-ID", "l2mo0icog8");
            getRequest.setHeader("X-NCP-APIGW-API-KEY", "Gh32v5mM5wjevKKCsVfkRpfaJ3FmP3XmLq7s3eVz");

            HttpResponse response = client.execute(getRequest);

            //Response 출력
            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);

                ObjectMapper mapper = new ObjectMapper();
                JsonNode bodyJson = mapper.readTree(body);

                String area_1 = bodyJson.path("results").path(0).path("region").path("area1").path("name").toString();
                area_1 = area_1.substring(1, area_1.length()-1);
                String area_2 = bodyJson.path("results").path(0).path("region").path("area2").path("name").toString();
                area_2 = area_2.substring(1, area_2.length()-1);
                String area_3 = bodyJson.path("results").path(0).path("region").path("area3").path("name").toString();
                area_3 = area_3.substring(1, area_3.length()-1);

                String location = area_1.concat(" ").concat(area_2).concat(" ").concat(area_3);

                return location;

            } else {
                return null;
            }

        } catch (Exception e) {
            return null;
        }
    }

}

