package com.porong.common.controller;



import com.porong.common.dto.message.*;
import com.porong.common.service.MemberServiceImpl;
import com.porong.common.service.MessageService;
import io.swagger.annotations.ApiOperation;
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

    private final MemberServiceImpl memberService;
    private final MessageService messageService;


    // 메세지 보내기
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/")
    @ApiOperation(value = "메세지 생성해서 보내기")
    Long postMessage(RequestCreateMessageDto requestCreateMessageDto) {
        return messageService.postMessage(requestCreateMessageDto);
        // 해당 messageId 반환
    }

    // 메세지 취소  // -> 이미 읽었을 때 에러 추가
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{messageId}")
    @ApiOperation(value = "메세지 취소하기, 상대가 이미 읽었다면 에러")
    void deleteMessage(@PathVariable("messageId") Long messageId) {
        messageService.deleteMessage(messageId);
    }

    // 단일 메세지 조회 // -> 시간 조건 추가
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/getmessage")
    @ApiOperation(value = "단일 메세지 조회, 보낸 사람이나 이미 읽힌 메세지는 제약없이 읽을 수 있고, 받은 사람은 시간 제약 조건만 검증, 시간 검증 안되면 null 값 반환")
    ResponseCheckedMessageDto getMessage(RequestMessageDto requestMessageDto) {
        return messageService.getMessage(requestMessageDto);

    }

    // 확인 안한 메세지 모두 조회 // -> dueTime 빠른 순 대로 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/fetchUncheckedMesaages")
    @ApiOperation(value = "확인 안한 메세지 모두 조회, 확인 가능 한 시간이 짧은 순대로 정렬 dueTime 가까운 순으로 정렬")
    List<ResponseUnCheckedMessageDto> fetchUnCheckedMessages(@PathVariable("memberId") Long memberId) {
        return messageService.fetchUnCheckedMessages(memberId);
    }

    // 받은 메세지 전체 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getreceivedmessages")
    @ApiOperation(value = "받은 메세지 전체 조회 , 시간 조건 만족 못한 메세지 (시간 만족까지 시간이 적게 남은 순서) + 시간 만족한 메세지(최근에 시간 조건 만족한 순서)")
    List<ResponseReceivedMessageDto> getReceivedMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getReceivedMessages(memberId);
    }

    // 보낸 메세지 전체 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getsentmessages")
    @ApiOperation(value = "보낸 메세지 전체 조회 , 최근에 보낸 메세지가 제일 앞으로 오게 정렬")
    List<ResponseSentMessageDto> getSentMessages(@PathVariable("memberId") Long memberId) {
        return messageService.getSentMessages(memberId);
    }


    // 확인 안한 메세지들 중 가장 빠른 시간 조건 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getrecentmessagetime")
    @ApiOperation(value = "확인 안한 메세지들 중 가장 빠른 시간 조건 조회")
    LocalDateTime getRecentMessageTime(@PathVariable("memberId") Long memberId) {
        return messageService.getRecentMessageTime(memberId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/TESTdatetime")
    @ApiOperation(value = "확인 안한 메세지들 중 가장 빠른 시간 조건 조회")
    LocalDateTime test() {
    LocalDateTime timeNow = LocalDateTime.now();
    return timeNow;
    }

    // 보류
    // 해당 멤버와 주고 받은 (확인한? 확인안한것들까지?) 메세지들을 조회
//    @ResponseStatus(HttpStatus.OK)
//    @PostMapping("/fetchmessagesbymember")
//    @ApiOperation(value = "확인 안한 메세지들 중 가장 빠른 시간 조건 조회")
//    List<ResponseMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
//        return messageService.fetchMessagesByMember(RequestBetweenMessagesDto);
//
//    }


}
