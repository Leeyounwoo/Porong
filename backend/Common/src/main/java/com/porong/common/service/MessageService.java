package com.porong.common.service;

import com.porong.common.dto.RequestBetweenMessagesDto;
import com.porong.common.dto.RequestCreateMessageDto;
import com.porong.common.dto.RequestMessageDto;
import com.porong.common.dto.ResponseMessageDto;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;

    @Transactional
    public Long postMessage(RequestCreateMessageDto requestCreateMessageDto) {
        Long memberId = requestLikeDto.getMemberId();

        return messageId;
    }

    @Transactional
    public void deleteMessage(Long messageId ) {
        Long memberId = requestLikeDto.getMemberId();

//        return messageId;
    }

    public List<ResponseMessageDto> fetchCheckedMessages(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public ResponseMessageDto getMessage(RequestMessageDto requestMessageDto) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public List<ResponseMessageDto> fetchAllMessages(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public LocalDateTime getRecentMessageTime(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public List<ResponseMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
        Optional<Member> optionalMember = memberRepository.findById(memberId); // 멤버 두개 확인
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }






}
