package com.porong.common.service;

import com.porong.common.domain.Member;
import com.porong.common.dto.SignupDto;
import com.porong.common.dto.authenticateDto;
import com.porong.common.dto.verifyDto;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MEMBER_REPOSITORY;
    private final ConcurrentHashMap<Long, String> authenticationNumber = new ConcurrentHashMap<>();

    @Override
    public void signup(SignupDto signupDto) throws Exception {
        if(!MEMBER_REPOSITORY.existsByPhoneNumber(signupDto.getPhoneNumber())) {
            try {
                Member member = new Member().builder()
                        .kakaoId(signupDto.getKakaoId())
                        .name(signupDto.getName())
                        .email(signupDto.getEmail())
                        .phoneNumber(signupDto.getPhoneNumber())
                        .profileUrl(signupDto.getProfileUrl())
                        .build();

                MEMBER_REPOSITORY.save(member);
            }
            catch (Exception e) {
                throw e;
            }
        }
    }

    @Override
    public void authenticate(authenticateDto authenticateDto) throws Exception {

    }

    @Override
    public void verify(verifyDto verifyDto) throws Exception {

    }
}
