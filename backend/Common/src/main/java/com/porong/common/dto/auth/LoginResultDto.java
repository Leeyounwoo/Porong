package com.porong.common.dto.auth;

import com.porong.common.domain.AuthMember;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResultDto {
    private boolean firstCheck;
    private AuthMember authMember;
}
