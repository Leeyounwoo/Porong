package com.porong.common.service;

import com.porong.common.repository.capsule.CapsuleRepository;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CapsuleService {

    private final CapsuleRepository capsuleRepository;
    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;


}
