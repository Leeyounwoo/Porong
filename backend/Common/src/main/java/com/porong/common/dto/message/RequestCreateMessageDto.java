package com.porong.common.dto.message;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class RequestCreateMessageDto implements Serializable {

    private Long senderId;
    private Long receiverId;
    private double latitude;
    private double longitude;
    private boolean isSecret; // false 일반 메시지, true 비밀 메시지
    private int paperType;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueTime;
    private String title;
    private String contentText;
    private String contentUrl;

    public RequestCreateMessageDto() {



    }

}
