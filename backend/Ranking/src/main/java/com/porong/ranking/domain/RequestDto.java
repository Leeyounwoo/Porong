package com.porong.ranking.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class RequestDto implements Serializable {
    private double latitude;
    private double longitude;
}
