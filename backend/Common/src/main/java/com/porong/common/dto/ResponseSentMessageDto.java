package com.porong.common.dto;

import com.porong.common.domain.Message;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ResponseSentMessageDto implements Serializable {

    private Long messageId;
    private Long receiverId; // 받는 사람
    private String receiverProfileUrl;
    private double latitude; // 제약 위치 조건
    private double longitude; // 제약 위치 조건
    private LocalDateTime dueTime; // 제약 시간
    private boolean isChecked; // 상대의 확인 여부 추가
    private LocalDateTime createdAt;
    private String title;

    public ResponseSentMessageDto(Message message) {

        this.messageId = message.getMessageId();
        this.receiverId = message.getReceiver().getMemberId();
        this.receiverProfileUrl = message.getReceiver().getProfileUrl();
        this.latitude = message.getLatitude();
        this.longitude = message.getLongitude();
        this.dueTime = message.getDueTime();
        this.isChecked = message.isChecked();
        this.createdAt = message.getCreatedAt();
        this.title = message.getTitle();

    }

}
