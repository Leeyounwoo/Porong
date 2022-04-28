package com.porong.common.controller;


import com.porong.common.dto.RequestCreateMessageDto;
import com.porong.common.dto.RequestMessageDto;
import com.porong.common.dto.ResponseMessageDto;
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
        messageService.createFond(requestCreateMessageDto);
        return messageId;
    }

    // 메세지 삭제
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{messageId}")
    void deleteMessage(RequestFondDto requestFondDto) {
        messageService.createFond(requestFondDto);
    }

    // 확인 안한 메세지 모두 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/fetchcheckedmessages")
    List<ResponseMessageDto> fetchLikedRamens(@PathVariable("memberId") Long memberId) {
        return messageService.fetchLikedRamens(memberId);
    }

    // 단일 메세지 조회
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/getmessage")
    List<ResponseMessageDto> postMessage(RequestMessageDto requestMessageDto) {
        return messageService.createFond(requestMessageDto);

    }

    // 전체 메세지 조회(보낸 메세지, 받은 메세지)
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/fetchallmessages")
    List<ResponseMessageDto> fetchLikedRamens(@PathVariable("memberId") Long memberId) {
        return messageService.fetchLikedRamens(memberId);
    }

    // 확인 안한 메세지들 중 가장 빠른 시간 조건 조회
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}/getrecentmessagetime")
    LocalDateTime fetchLikedRamens(@PathVariable("memberId") Long memberId) {
        return messageService.fetchLikedRamens(memberId);
    }

    // 해당 멤버와 주고 받은 (확인한? 확인안한것들까지?) 메세지들을 조회
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/fetchmessagesbymember")
    List<ResponseMessageDto> postMessage(RequestMessageDto requestMessageDto) {
        return messageService.createFond(requestMessageDto);

    }



}
