package com.porong.common.service;

import com.porong.common.domain.AuthMember;
import com.porong.common.dto.auth.LoginResultDto;

public interface AuthService {
    LoginResultDto getAccessToken(String code);
    AuthMember getAuthInfo(String token);
}
