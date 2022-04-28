package com.porong.common.controller;

import com.porong.common.dto.SignupDto;
import com.porong.common.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;

    @PostMapping("/signup") // 회원가입
    public ResponseEntity<String> signup(@RequestBody SignupDto signupDto) {
        try {
            memberService.signup(signupDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("회원가입이 불가능합니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("회원가입이 완료되었습니다.", HttpStatus.OK);
    }


}
