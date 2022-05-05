package com.porong.common.dto.message;

import com.porong.common.domain.Message;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ResponseUnCheckedMessageDto implements Serializable {

    private Long messageId;
    private Long senderId; // 보낸 사람
    private String senderName;
    private String senderProfileUrl;
    private double latitude; // 제약 위치 조건
    private double longitude; // 제약 위치 조건
    private LocalDateTime dueTime; // 제약 시간
    private boolean isChecked; // 확인 여부 X
    private LocalDateTime createdAt;
    private String title;

    public ResponseUnCheckedMessageDto(Message message) {
        this.messageId = message.getMessageId();
        this.senderId = message.getSender().getMemberId();
        this.senderName = message.getSender().getName();
        this.senderProfileUrl = message.getSender().getProfileUrl();
        this.latitude = message.getLatitude();
        this.longitude = message.getLongitude();
        this.dueTime = message.getDueTime();
        this.isChecked = false;
        this.createdAt = message.getCreatedAt();
        this.title = message.getTitle();
    }

}
