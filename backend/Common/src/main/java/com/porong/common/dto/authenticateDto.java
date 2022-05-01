package com.porong.common.dto;

import lombok.Data;

@Data
public class authenticateDto {
    private Long kakaoId;
    private String phoneNumber;
}
