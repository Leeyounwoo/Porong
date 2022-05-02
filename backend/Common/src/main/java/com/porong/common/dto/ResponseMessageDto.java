package com.porong.common.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ResponseMessageDto implements Serializable {

    private Long messageId;
    private Long receiverId; // 보낸 사람
    private Long senderId; // 보낸 사람
    private String senderProfileUrl;
    private double latitude; // 제약 위치 조건
    private double longitude; // 제약 위치 조건
    private LocalDateTime dueTime; // 제약 시간
    private boolean isChecked; // 확인 여부 X
    private LocalDateTime createdAt;
    private String title;

    public ResponseMessageDto() {

    }

}
