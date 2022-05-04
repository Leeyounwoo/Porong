package com.porong.common.dto.auth;

import com.porong.common.domain.AuthMember;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String result;
    private boolean firstCheck;
    private AuthMember authMember;
}
