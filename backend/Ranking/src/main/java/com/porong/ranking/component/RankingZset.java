package com.porong.ranking.component;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RankingZset {

    private final RedisTemplate<String,String> redisTemplate;
    private final ZSetOperations<String, String> zSetOperations;
    private final org.springframework.data.redis.core.SetOperations<String, String> SetOperations;

    public RankingZset(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.zSetOperations = redisTemplate.opsForZSet();
        this.SetOperations = redisTemplate.opsForSet();
    }

    public void locationCount(String locationName) {
        zSetOperations.incrementScore("locationcount", String.valueOf(locationName), 1);
    }
    public List<String> getLocation() {
        return new ArrayList<>(zSetOperations.reverseRange("locationcount", 0,2));
    }

}
