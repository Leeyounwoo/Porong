package com.porong.ranking.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class LocationVo implements Serializable {
    private final String location;
    private final double latitude;
    private final double longitude;

    public LocationVo(Location location) {
        this.location = location.getLocationName();
        this.latitude = location.getLatitude();
        this.longitude = location.getLongitude();
    }
}
