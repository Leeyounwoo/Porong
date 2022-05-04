package com.porong.common.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class RequestMessageDto implements Serializable {

    private Long memberId;
    private Long messageId;
//    private double latitude; // 현재 위치
//    private double longitude; // 현재 위치

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timeNow; // 현재시간

}
