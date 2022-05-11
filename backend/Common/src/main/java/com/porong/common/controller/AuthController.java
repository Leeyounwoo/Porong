package com.porong.common.controller;

import com.porong.common.domain.AuthMember;
import com.porong.common.domain.Member;
import com.porong.common.dto.auth.LoginResponseDto;
import com.porong.common.dto.auth.LoginSignupDto;
import com.porong.common.service.AuthServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/oauth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final AuthServiceImpl authService;

    @GetMapping("/login")
    @ApiOperation(value = "카카오 소셜 로그인")
    public ResponseEntity<LoginResponseDto> loginResponse(@RequestParam String token){

        AuthMember authMember = null;
        LoginResponseDto loginResponseDto = new LoginResponseDto();

        if (token == null){
            loginResponseDto.setResult(FAIL);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        else{
            authMember = authService.getAuthInfo(token);
            if (authMember == null){
                loginResponseDto.setResult(FAIL);
            }
        }

        loginResponseDto.setResult(SUCCESS);
        loginResponseDto.setAuthMember(authMember);
        loginResponseDto.setFirstCheck(authService.firstCheck(authMember.getKakaoId()));
        if (!authService.firstCheck(authMember.getKakaoId())){
            loginResponseDto.setMemberId(authService.convertKakaoId(authMember.getKakaoId()));
        }
        else {
            loginResponseDto.setMemberId(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<Member> loginSignup(@RequestBody LoginSignupDto loginSignupDto) throws Exception {

        if (!loginSignupDto.isFirstCheck()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        else{
            Member member = authService.signup(loginSignupDto);
            System.out.println("진짜 저장완료!!! - 컨트롤러");
            return ResponseEntity.status(HttpStatus.OK).body(member);
        }
    }

    @GetMapping("/convert/kakaoId/{kakaoId}")
    @ApiOperation(value = "카카오 아이디를 멤버 아이디로 바꾸기")
    public ResponseEntity<Long> convertKakaoId(@PathVariable Long kakaoId) {
        Long memberId = authService.convertKakaoId(kakaoId);
        return ResponseEntity.status(HttpStatus.OK).body(memberId);
    }

//    @PostMapping("/signup")
//    @ApiOperation(value = "회원가입")
//    public ResponseEntity<String> loginSignup(@RequestBody LoginSignupDto loginSignupDto){
//
//        Long kakaoId = loginSignupDto.getKakaoId();
//
//        if (!loginSignupDto.isFirstCheck()){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("kakaoId(" + kakaoId + ") already signup");
//        }
//        else{
//            Member member = authService.signup(loginSignupDto);
//            System.out.println("진짜 저장완료!!! - 컨트롤러");
//            return ResponseEntity.status(HttpStatus.OK).body("kakaoId(" + kakaoId + ") complete signup");
//        }
//    }

//    @DeleteMapping("withdrawal/{memberId}")
//    @ApiOperation(value = "회원탈퇴")
//    public ResponseEntity<String> loginWithdrawal (@PathVariable(name = "memberId") Long memberId){
//        authService.withdrawal(memberId);
//        return ResponseEntity.status(HttpStatus.OK).body("진짜 탈퇴완료!!! - 컨트롤러");
//    }

}
