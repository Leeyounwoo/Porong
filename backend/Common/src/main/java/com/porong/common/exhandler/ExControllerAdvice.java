package com.porong.common.exhandler;

import com.porong.common.controller.MemberController;
import com.porong.common.controller.MessageController;
import com.porong.common.exception.MemberNotFoundException;
import com.porong.common.exception.MessageNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(assignableTypes = {MemberController.class, MessageController.class})
public class ExControllerAdvice {

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorResponse> MemberNotFoundExHandler(MemberNotFoundException e) {
        log.error("[exceptionHandler] ex", e);
        ErrorResponse errorResponse = ErrorResponse.builder().message("멤버를 찾을 수 없습니다").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<ErrorResponse> RamenNotFoundExHandler(MessageNotFoundException e) {
        log.error("[exceptionHandler] ex", e);
        ErrorResponse errorResponse = ErrorResponse.builder().message("메세지를 찾을 수 없습니다").build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
}
