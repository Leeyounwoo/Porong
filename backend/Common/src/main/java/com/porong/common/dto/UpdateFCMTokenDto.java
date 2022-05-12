package com.porong.common.dto;

import lombok.Data;

@Data
public class UpdateFCMTokenDto {
    private Long memberId;
    private String fcmToken;
}
