package com.porong.common.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class RequestMessageDto implements Serializable {

    private Long memberId;
    private Long messageId;
    private double latitude; // 현재 위치
    private double longitude; // 현재 위치
    private LocalDateTime timeNow; // 현재시간

    public RequestMessageDto() {

    }

}
