package com.porong.common.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class RequestMessageDto implements Serializable {

    private Long memberId;
    private double latitude;
    private double longitude;
    private LocalDateTime timeNow; // 현재시간

}
