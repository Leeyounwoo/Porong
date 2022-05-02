package com.porong.common.controller;


import com.porong.common.dto.*;
import com.porong.common.service.MemberService;
import com.porong.common.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("v1/message")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {

    private final MemberService memberService;
    private final MessageService messageService;


    // 메세지 보내기
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/")
    Long postMessage(RequestCreateMessageDto requestCreateMessageDto) {
        return messageService.postMessage(requestCreateMessageDto);
        // 해당 messageId 반환
    }

    // 메세지 취소 // 분기 처리 추가?
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{messageId}")
    void deleteMessage(@PathVariable("messageId") Long messageId) {
        messageService.deleteMessage(messageId);
    }

    // 단일 메세지 조회 // 아직 시간, 공간 조건 확인 안함
    @ResponseStatus(HttpStatus.OK) // 여기서 위경도, 시간 검증 추가?
    @PostMapping("/getmessage")
    ResponseCheckedMessageDto getMessage(RequestMessageDto requestMessageDto) {
        return messageService.getMessage(requestMessageDto);

    }

    // 확인 안한 메세지 모두 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/fetchUncheckedMesaages")
    List<ResponseUnCheckedMessageDto> fetchUnCheckedMessages(@PathVariable("memberId") Long memberId) {
        return messageService.fetchUnCheckedMessages(memberId);
    }

    // 받은 메세지 전체 조회 // 정렬 기능 추가 필요
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getreceivedmessages")
    List<ResponseReceivedMessageDto> getReceivedMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getReceivedMessages(memberId);
    }

    // 보낸 메세지 전체 조회 // 정렬 기능 추가 필요
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getsentmessages")
    List<ResponseSentMessageDto> getSentMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getSentMessages(memberId);
    }

    /* 구현 예정


    // 확인 안한 메세지들 중 가장 빠른 시간 조건 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getrecentmessagetime")
    LocalDateTime getRecentMessageTime(@PathVariable("memberId") Long memberId) {
        return messageService.getRecentMessageTime(memberId);
    }

    // 해당 멤버와 주고 받은 (확인한? 확인안한것들까지?) 메세지들을 조회
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/fetchmessagesbymember")
    List<ResponseMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
        return messageService.fetchMessagesByMember(RequestBetweenMessagesDto);

    }



     */
}
