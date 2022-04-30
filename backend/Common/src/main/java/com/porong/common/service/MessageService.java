package com.porong.common.service;

import com.porong.common.domain.Member;
import com.porong.common.dto.*;
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

    // 메세지 보내기
    @Transactional
    public Long postMessage(RequestCreateMessageDto requestCreateMessageDto) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        Long memberId = requestLikeDto.getMemberId();

//        requestCreateMessageDto

        return messageId;
    }

    // 메세지 취소
    @Transactional
    public void deleteMessage(Long messageId) {
        // 확인을 안했고, 즉 isChecked 가 0 이면서 SenderId 가 신청을 헀을때 메세지 취소
        // isDeleted = 0 -> isDeleted = 1

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        Long memberId = requestLikeDto.getMemberId();

//        return messageId;
    }

    // 확인 안한 메세지 모두 조회 -> 생성 시간 순? 제약 시간 조건 순?
    public List<ResponseUnCheckedMessageDto> fetchUnCheckedMessages(Long memberId) {
        // memberId로 멤버 불러온 뒤 receiverId 및 isCheck = 0 , isDeleted = 0 인거 리스트로 불러오기

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    // 메세지 조회
    public ResponseCheckedMessageDto getMessage(RequestMessageDto requestMessageDto) {
        // 분기 처리
        // isDeleted = 0 인 것들 중에서

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

    // 받은 메세지 전체 조회
    public List<ResponseReceivedMessageDto> getRecievedMessages(Long memberId) {
        // memberId 로 찾은 후
        // receiverId 로 가져오고, isDeleted = 0 인거 가져옴

        // 우선 시간 조건 만족 안한거 timeNow 랑 dueTime 비교 한후 timeNow < dueTime들 가져오고
        // dueTime 작은 순대로 정렬

        // 시간 조건 만족한 메세지들 timeNow > dueTime 메세지들 가져오고
        // dueTime 큰 순서대로 정렬

        // 가져온 후 두개를 합 침

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    // 보낸 메세지 전체 조회
    public List<ResponseSentMessageDto> getSentMessages(Long memberId) {
        // memberId 로 찾은 후
        // senderId로 찾은 후, isDeleted = 0 인거 가져옴

        // 모두 가져온 후 createdAt이 큰 순서대로 정렬

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    // 확인 안한 메세지들 중 가장 빠른 시간 조건 조회
    public LocalDateTime getRecentMessageTime(Long memberId) {
        // memberId로 recieveId 메세지들 가져온 다음에
        // isChecked = 0 이랑, isDeleted = 0 들 적용 시키고,
        // 확인 안한 메세지들 가져와서 가장 작은 dueTime 반환

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        return messageId;
    }

    // 해당 멤버와 주고 받은 (확인한? 확인안한것들까지?) 메세지들을 조회
    public List<ResponseMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
        // 두명의 member 가져온 후
        // 각각 sender, reciever 바꾸면서 메세지들 가져온 다음에 createdAt? dueTime 순으로 정렬
        // 모두 합치고 반환

        Optional<Member> optionalMember1 = memberRepository.findById(memberId); // 멤버 두개 확인
        if (optionalMember1.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member1 = optionalMember1.get();

        Optional<Member> optionalMember2 = memberRepository.findById(memberId);
        if (optionalMember2.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member2 = optionalMember2.get();

        return messageId;
    }






}
