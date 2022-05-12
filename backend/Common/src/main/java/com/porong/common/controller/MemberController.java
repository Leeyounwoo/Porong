package com.porong.common.controller;

import com.porong.common.dto.*;
import com.porong.common.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "v1/member")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    public ResponseEntity<String> authenticate(@RequestBody AuthenticateDto authenticateDto) {
        try {
            memberService.authenticate(authenticateDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("인증문자 전송실패.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("인증문자 전송성공", HttpStatus.OK);
    }

    @PostMapping("/verify") // 인증번호 검증요청
    public ResponseEntity<String> verify(@RequestBody VerifyDto verifyDto) {
        try {
            memberService.verify(verifyDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("인증번호가 다릅니다. 재인증 요청", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("인증번호가 같습니다. 가입진행", HttpStatus.OK);
    }

    @PostMapping("/follow") // 팔로우 하기
    public ResponseEntity<String> follow(@RequestBody FollowDto followDto) {
        try {
            memberService.follow(followDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("팔로우 요청실패", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("팔로우 성공", HttpStatus.OK);
    }

    @PostMapping("/fetchContact") // 팔로우 목록 불러오기 (핸드폰과 일치하는 명단만)
    public ResponseEntity<List<PhoneBookDto>> fetchContact(@RequestBody List<String> phoneList) {
        List<PhoneBookDto> resultList = new ArrayList<>();
        try {
            resultList =  memberService.fetchContact(phoneList);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
    
    @PostMapping("/updateFCMToken")
    public ResponseEntity<String> updateFCMToken(@RequestBody UpdateFCMTokenDto updateFCMTokenDto) {
        try {
            memberService.updateFCMToken(updateFCMTokenDto);
        }
        catch (Exception e) {
            return new ResponseEntity<>("FCM APP 토큰이 저장 실패 재발급필요", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("FCM APP 토큰 저장 성공", HttpStatus.OK);
    }

}
