package com.porong.common.service;

import com.porong.common.domain.Member;
import com.porong.common.dto.RequestBetweenMessagesDto;
import com.porong.common.dto.RequestCreateMessageDto;
import com.porong.common.dto.RequestMessageDto;
import com.porong.common.dto.ResponseCheckedMessageDto;
import com.porong.common.exception.MemberNotFoundException;
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

    public List<ResponseCheckedMessageDto> fetchCheckedMessages(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public ResponseCheckedMessageDto getMessage(RequestMessageDto requestMessageDto) {
        // 분기 처리
        // 받는 사람 중 봤던 거라면, 즉 isChecked = 1 이라면, 제약 없이 바로 확인 가능
        // 아직 확인을 안했다면, 제약조건(거리와 시간)을 확인해서 response 후 isCheked = 0 -> isChecked = 1

        // 보낸 사람은 아무 제약 조건에 상관없이 확인이 가능함



        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    public List<ResponseCheckedMessageDto> fetchAllMessages(Long memberId) {
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

    public List<ResponseCheckedMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
        Optional<Member> optionalMember = memberRepository.findById(memberId); // 멤버 두개 확인
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }






}
