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
    private boolean firstCheck;
}
