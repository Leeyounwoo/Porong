package com.porong.common.service;

import com.porong.common.dto.SignupDto;

public interface MemberService {
    public void signup(SignupDto signupDto) throws Exception;
}
