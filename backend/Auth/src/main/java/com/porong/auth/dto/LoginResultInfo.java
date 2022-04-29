package com.porong.auth.dto;

import com.porong.auth.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResultInfo {
    private Member member;
    private boolean firstCheck; // 최초 로그인 여부 판단
}
