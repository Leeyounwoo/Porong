package com.porong.ranking.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class LocationVo implements Serializable {
    private final String location;

    public LocationVo(String locationName) {
        this.location = locationName;
    }

    public LocationVo(Location location) {
        this.location = location.getLocation();
    }

}
