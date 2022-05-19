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
    private Long receiverId; // 보낸사람 아이디
    private String receiverName;
    private String senderProfileUrl;
    private double latitude;
    private double longitude;
    private LocalDateTime dueTime;
    private boolean isChecked; // 확인 여부 O
    private LocalDateTime createdAt;
    private String title;
    private String contentText;
    private String location;
    private String senderUrl;
    private String receiverUrl;
    private int paperType;


    public ResponseCheckedMessageDto(Message message){

        this.messageId = message.getMessageId();
        this.senderId = message.getSender().getMemberId();
        this.senderName = message.getSender().getName();
        this.receiverId = message.getReceiver().getMemberId();
        this.receiverName = message.getReceiver().getName();
        this.senderProfileUrl = message.getSender().getProfileUrl();
        this.latitude = message.getLatitude();
        this.longitude = message.getLongitude();
        this.dueTime = message.getDueTime();
        this.isChecked = true;
        this.createdAt = message.getCreatedAt();
        this.title = message.getTitle();
        this.contentText = message.getContentText();
        this.location = message.getLocation();
        this.senderUrl = message.getSender().getProfileUrl();
        this.receiverUrl = message.getReceiver().getProfileUrl();
        this.paperType = message.getPaperType();
    }

    public ResponseCheckedMessageDto(){

    }

}
