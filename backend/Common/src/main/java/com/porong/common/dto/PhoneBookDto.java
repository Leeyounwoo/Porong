package com.porong.common.dto;

import lombok.Data;

@Data
public class PhoneBookDto {
    private long memberId;
    private boolean isSignup;
    private String name;
    private String profileUrl;
    private String phoneNumber;
    private String email;
}
