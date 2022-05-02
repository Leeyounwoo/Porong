package com.porong.common.service;

import com.porong.common.dto.SignupDto;
import com.porong.common.dto.authenticateDto;
import com.porong.common.dto.verifyDto;

public interface MemberService {
    public void signup(SignupDto signupDto) throws Exception;
    public void authenticate(authenticateDto authenticateDto) throws Exception;
    public void verify(verifyDto verifyDto) throws Exception;
}
