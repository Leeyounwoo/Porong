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
        messageService.postMessage(requestCreateMessageDto);
        return MessageId;
    }

    // 메세지 취소
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{messageId}")
    void deleteMessage(@PathVariable("messageId") Long messageId) {
        messageService.deleteMessage(messageId);
    }

    // 단일 메세지 조회
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

    // 받은 메세지 전체 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getrecievedmessages")
    List<ResponseReceivedMessageDto> getRecievedMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getRecievedMessages(memberId);
    }

    // 보낸 메세지 전체 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getsentmessages")
    List<ResponseSentMessageDto> getSentMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getSentMessages(memberId);
    }

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

}
