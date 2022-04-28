package com.porong.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpInfo {
    private String kakaoId;
    private String memberId; // 사용자가 임의로 저장
    private String accessToken;
}
