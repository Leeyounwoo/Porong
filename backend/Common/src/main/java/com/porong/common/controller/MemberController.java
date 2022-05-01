package com.porong.common.controller;

import com.porong.common.dto.authenticateDto;
import com.porong.common.dto.SignupDto;
import com.porong.common.dto.verifyDto;
import com.porong.common.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/authentication") // 전화번호 인증번호 발신요청
    public ResponseEntity<String> authenticate(@RequestBody authenticateDto authenticateDto) {
        try {
            memberService.authenticate(authenticateDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("인증문자 전송실패.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("인증문자 전송성공", HttpStatus.OK);
    }

    @PostMapping("/verify") // 인증번호 검증요청
    public ResponseEntity<String> verify(@RequestBody verifyDto verifyDto) {
        try {
            memberService.verify(verifyDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("인증번호가 다릅니다. 재인증 요청", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("인증번호가 같습니다. 가입진행", HttpStatus.OK);
    }

}
