package com.porong.common.service;

import com.porong.common.dto.SignupDto;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MEMBER_REPOSITORY;

    @Override
    public void signup(SignupDto signupDto) throws Exception {

    }
}
