package com.porong.common.dto;

import lombok.Data;

@Data
public class AuthenticateDto {
    private Long kakaoId;
    private String phoneNumber;
}
