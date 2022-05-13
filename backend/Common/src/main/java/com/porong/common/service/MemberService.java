package com.porong.common.service;

import com.porong.common.dto.*;

import java.util.List;

public interface MemberService {
    public void signup(SignupDto signupDto) throws Exception;
    public void authenticate(AuthenticateDto authenticateDto) throws Exception;
    public void verify(VerifyDto verifyDto) throws Exception;
    public void follow(FollowDto followDto) throws Exception;
    public List<PhoneBookDto> fetchContact(List<String> phoneList) throws Exception;
    public void updateFCMToken(UpdateFCMTokenDto updateFCMTokenDto) throws Exception;
}
