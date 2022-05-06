package com.porong.common.controller;

import com.porong.common.domain.AuthMember;
import com.porong.common.domain.Member;
import com.porong.common.dto.auth.LoginResponseDto;
import com.porong.common.dto.auth.LoginSignupDto;
import com.porong.common.service.AuthService;
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

    @Autowired
    private AuthService authService;

//    @GetMapping("/login/response")
//    @ApiOperation(value = "카카오 소셜 로그인으로 사용자 정보를 받아올 수 있다")
//    public ResponseEntity<LoginResponseDto> loginResponse(@RequestParam String code){
//
////        // code 잘 받아오나 테스트
////        System.out.println("controller get code : " + code);
////        // token 잘 받아오나 테스트
////        String access_token = authService.getAccessToken(code).getAccessToken();
////        System.out.println("controller get token : " + access_token);
////        System.out.println(authService.getAuthInfo(access_token));
//
//        LoginResultDto loginResultDto = null;
//        LoginResponseDto loginResponseDto = new LoginResponseDto();
//
//        if (code == null){
//            loginResponseDto.setResult(FAIL);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//        }
//        else{
//            loginResultDto = authService.getAccessToken(code);
//            if (loginResultDto == null){
//                loginResponseDto.setResult(FAIL);
//            }
//        }
//
//        loginResponseDto.setResult(SUCCESS);
//        loginResponseDto.setFirstCheck(loginResultDto.isFirstCheck());
//        loginResponseDto.setAuthMember(loginResultDto.getAuthMember());
//
//        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
//    }

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

        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<Member> loginSignup(@RequestBody LoginSignupDto loginSignupDto){

        if (!loginSignupDto.isFirstCheck()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        else{
            Member member = authService.signup(loginSignupDto);
            System.out.println("진짜 저장완료!!! - 컨트롤러");
            return ResponseEntity.status(HttpStatus.OK).body(member);
        }
    }

}
