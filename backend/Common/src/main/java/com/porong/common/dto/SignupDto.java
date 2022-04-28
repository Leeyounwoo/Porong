package com.porong.common.dto;

import lombok.Data;

@Data
public class SignupDto {
    private Long kakaoId;
    private String name;
    private String email;
    private String phoneNumber;
    private String profileUrl;
}
