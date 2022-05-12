package com.porong.common.dto.capsule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostDto {
    private Long capsuleId;
    private Long memberId;
    private String title;
    private String content;
    private double latitude;
    private double longitude;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueTime;
}
