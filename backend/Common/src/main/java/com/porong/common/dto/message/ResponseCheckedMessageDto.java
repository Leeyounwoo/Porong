package com.porong.common.dto.message;

import com.porong.common.domain.Message;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ResponseCheckedMessageDto implements Serializable {

    private Long messageId;
    private Long senderId; // 보낸사람 아이디
    private String senderName;
    private String senderProfileUrl;
    private double latitude;
    private double longitude;
    private LocalDateTime dueTime;
    private boolean isChecked; // 확인 여부 O
    private LocalDateTime createdAt;
    private String title;
    private String contentText;


    public ResponseCheckedMessageDto(Message message){

        this.messageId = message.getMessageId();
        this.senderId = message.getSender().getMemberId();
        this.senderName = message.getSender().getName();
        this.senderProfileUrl = message.getSender().getProfileUrl();
        this.latitude = message.getLatitude();
        this.longitude = message.getLongitude();
        this.dueTime = message.getDueTime();
        this.isChecked = true;
        this.createdAt = message.getCreatedAt();
        this.title = message.getTitle();
        this.contentText = message.getContentText();

    }

    public ResponseCheckedMessageDto(){

    }

}
