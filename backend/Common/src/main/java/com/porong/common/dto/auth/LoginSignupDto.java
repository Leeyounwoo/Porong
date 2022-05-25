package com.porong.common.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginSignupDto {
    private boolean firstCheck;
    private Long kakaoId;
    private String nickName;
    private String imageUrl;
    private String phoneNumber;
}
