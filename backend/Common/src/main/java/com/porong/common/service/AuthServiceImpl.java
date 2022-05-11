package com.porong.common.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.porong.common.domain.AuthMember;
import com.porong.common.domain.Follow;
import com.porong.common.domain.Member;
import com.porong.common.domain.Message;
import com.porong.common.dto.auth.LoginSignupDto;
import com.porong.common.exception.MemberNotFoundException;
import com.porong.common.repository.FollowRepository;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final FollowRepository followRepository;

//    public LoginResultDto getAccessToken(String code){
//
//        LoginResultDto loginResultDto = new LoginResultDto();
//
//        String access_token = "";
//        String refresh_token = "";
//        String request_url = "https://kauth.kakao.com/oauth/token";
//
////        String redirect_uri = "http://localhost:8081/v1/oauth/login/response";
//        String redirect_uri = "http://k6c102.p.ssafy.io:8080/v1/oauth/login/response";
//        String client_id = "b2ccc4b2aea13a0177528a9f3d9b97ce";
//        String client_secret = "7iCyUW6VarCPsjAwQOTrYTJzeRCQ5LoA";
//
//        try{
//
//            // https://kauth.kakao.com/oauth/token 연결
//            URL url = new URL(request_url);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            //POST 요청을 위해 기본값이 false 인 setDoOutput 을 true 로
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//
//            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id=" + client_id);
//            sb.append("&redirect_uri=" + redirect_uri);
//            sb.append("&code=" + code);
//            sb.append("&client_secret=" + client_secret);
//            bw.write(sb.toString());
//            bw.flush();
//
//            System.out.println(sb.toString());
//
//            //결과 코드가 200이라면 성공
//            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);
//
//            //요청을 통해 얻은 JSON 타입의 Response 메세지 읽어오기
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            String result = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            System.out.println("response body : " + result);
//
//            //Gson 라이브러리로 JSON 파싱
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            access_token = element.getAsJsonObject().get("access_token").getAsString();
//            refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();
//            System.out.println("access_token : " + access_token);
//            System.out.println("refresh_token : " + refresh_token);
//
//            br.close();
//            bw.close();
//
//        }catch (IOException e){
//            e.printStackTrace();
//        }
//
//        AuthMember authMember = getAuthInfo(access_token);
//        loginResultDto.setAuthMember(authMember);
//        System.out.println(authMember.toString());
//
//        if (memberRepository.findByKakaoId(authMember.getKakaoId()) == null){
//            loginResultDto.setFirstCheck(true);
//        }else loginResultDto.setFirstCheck(false);
//
//        return loginResultDto;
//    }

    public AuthMember getAuthInfo(String token){

        AuthMember authMember = new AuthMember();

        String request_url = "https://kapi.kakao.com/v2/user/me";

        try{

            URL url = new URL(request_url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false 인 setDoOutput 을 true
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //전송할 header 작성, access_token 전송
            conn.setRequestProperty("Authorization", "Bearer " + token);

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON 타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리로 JSON 파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
//            boolean profile_agreement = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile_needs_agreement").getAsBoolean();

            Long id = element.getAsJsonObject().get("id").getAsLong();
            String nickName = "";
            String imageUrl = "";

//            if(profile_agreement){
                nickName = kakao_account.get("profile").getAsJsonObject().get("nickname").getAsString();
                imageUrl = kakao_account.get("profile").getAsJsonObject().get("profile_image_url").getAsString();
//            }

            System.out.println("id : " + id);
            System.out.println("nickName : " + nickName);
            System.out.println("imageUrl : " + imageUrl);

            authMember.setKakaoId(id);
            authMember.setNickName(nickName);
            authMember.setImageUrl(imageUrl);
//            authMember.setAccessToken(token);

            br.close();

        }catch (IOException e){
            e.printStackTrace();
        }

        return authMember;
    }

    public boolean firstCheck(Long kakaoId){
        Member member = memberRepository.findByKakaoId(kakaoId);
        if (member == null){
            return true;
        }else {
            return false;
        }
    }

    public boolean memberExist(Long kakaoId){
        Member member = memberRepository.findByMemberId(kakaoId);
        if (member == null){
            return true;
        }else {
            return false;
        }
    }

    public Member signup(LoginSignupDto loginSignupDto) {

        Member member = new Member();

        if (!memberRepository.existsByPhoneNumber(loginSignupDto.getPhoneNumber())) {
            try {
                member.setKakaoId(loginSignupDto.getKakaoId());
                member.setName(loginSignupDto.getNickName());
                member.setProfileUrl(loginSignupDto.getImageUrl());
                member.setPhoneNumber(loginSignupDto.getPhoneNumber());

                memberRepository.save(member);
                System.out.println("저장완료!!! - 서비스");
            } catch (Exception e) {
                throw e;
            }
        }
        return member;
    }

//    public void withdrawal(Long memberId){
////        messageRepository.deleteByReceiverId(targetId);
//
//        // foreign key constraint
//        System.out.println("memberId : " + memberId);
//
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        if (optionalMember.isEmpty()) {
//            throw new MemberNotFoundException();
//        }
//        Member member = optionalMember.get();
//
////        List<Message> messages = messageRepository.findReceivedMessagesByMemberId(member.getMemberId());
////        for (Message m : messages) {
////            System.out.println(m.getMessageId());
////            messageRepository.deleteById(m.getMessageId());
////        }
//
////       List<Message> messages = messageRepository.findSentMessagesByMemberId(member.getMemberId());
////        for (Message m : messages) {
////            System.out.println(m.getMessageId());
////            messageRepository.deleteById(m.getMessageId());
////        }
//
//        List<Follow> follows = followRepository.findFollowingListByMemberId(member.getMemberId());
//        for (Follow f : follows) {
//            System.out.println("followId : " + f.getFollowId());
//            followRepository.deleteById(f.getFollowId());
//        }
//
////        Follow follow = followRepository.findFollow(memberId);
////        System.out.println(follow.getFollowId());
//
//        memberRepository.deleteById(memberId);
//        System.out.println("탈퇴완료!!! - 서비스");
//    }

}
