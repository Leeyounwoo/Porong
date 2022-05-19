package com.porong.ranking.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Data
@RedisHash(value="location")
public class Location implements Serializable {

    @Id
    private Long Id;
    @Indexed
    private double latitude;
    @Indexed
    private double longitude;
    @Indexed
    private String locationName;


}
