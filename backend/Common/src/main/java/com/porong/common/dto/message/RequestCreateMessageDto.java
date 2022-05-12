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
    private boolean isScret;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueTime;
    private String title;
    private String contentText;
//    private String contentUrl; // 이미지, 영상 등 추후에 추가

    public RequestCreateMessageDto() {



    }

}
