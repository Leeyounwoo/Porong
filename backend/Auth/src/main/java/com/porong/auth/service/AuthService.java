package com.porong.auth.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.porong.auth.domain.Member;
import com.porong.auth.domain.MemberRepository;
import com.porong.auth.dto.LoginResultInfo;
import com.porong.auth.dto.SignUpInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class AuthService {

    @Autowired
    private MemberRepository memberRepository;

    /**
     * <토큰을 발급 받고, 로그인 한 사용자 정보와 첫 로그인 여부 조회>
     * 1. authorizeCode 를 이용하여 accessToken 발급
     * 2. 발급받은 토큰으로 사용자 조회 (Member getUserInfo(String accessToken))
     * 3. 사용자 정보 (Member member)와 로그인 최초 여부 (boolean firstCheck)를 담아서 loginResultInfo 반환
     * @param authorizeCode
     * @return
     * @throws IOException
     */
    public LoginResultInfo getAccessToken(String authorizeCode) throws IOException {

        System.out.println("==================== start getAccessToken");

        String access_token = "";
        String refresh_token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

//        String redirect_uri = "http://localhost:8082/oauth/login/response";
        String redirect_uri = "http://k6c102.p.ssafy.io:8082/oauth/login/response";
        String client_id = "d69493d9641df7cfe7ad6140fdd75a5a";
        String client_secret = "5cjtbcma1P2ntCwMBnbkC1J3E9TrVfZU";

        try{
            // https://kauth.kakao.com/oauth/token 연결
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false 인 setDoOuput 을 true
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필수로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + client_id);
            sb.append("&redirect_uri=" + redirect_uri);
            sb.append("&code=" + authorizeCode);
            sb.append("&client_secret="+client_secret);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int statusCode = conn.getResponseCode();
            System.out.println("status code : " + statusCode);

            // 요청을 통해 얻은 JSON 타입의 Response 메시지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null){
                result = result + line;
            }
            System.out.println("response body : " + result);

            // Gson 라이브러리에 포함된 클래스로 JSON 파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            
            // 파싱 결과를 access_token, refresh_token 변수에 저장
            access_token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_token = element.getAsJsonObject().get("refresh_token").getAsString();
            System.out.println("access_token : " + access_token);
            System.out.println("refresh_token : " + refresh_token);

            br.close();
            bw.close();
        }
        catch (IOException e){
            e.printStackTrace();
        }

        // access_token 을 사용하여 조회한 사용자 정보를 member 객체에 저장
        Member member = null;
        member = getUserInfo(access_token);

        LoginResultInfo loginResultInfo = new LoginResultInfo();

        // 처음 로그인 한 사용자면
        if (!memberRepository.existsById(member.getKakaoId())) {
            loginResultInfo.setFirstCheck(true);
            loginResultInfo.setMember(member);
        }
        // 이미 로그인 한 사용자라면
        else {
            loginResultInfo.setFirstCheck(false);
            loginResultInfo.setMember(member);
        }
        return loginResultInfo;
    }

    /**
     * <토큰을 이용하여, 로그인 한 사용자 정보를 조회>
     * 1. accessToken 을 이용하여 사용자 정보 조회
     * 2. 파싱 결과 (kakaoId, nickName, imageUrl, email, birthday)와 accessToken 를 담아서 member 반환
     * @param accessToken
     * @return
     * @throws IOException
     */
    public Member getUserInfo(String accessToken) throws IOException{

        System.out.println("==================== start getUserInfo");

        Member member = new Member();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {
            // https://kapi.kakao.com/v2/user/me 연결
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false 인 setDoOuput 을 true
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // 요청에 필요한 Header 에 포함될 내용 작성 (accessToken 전송)
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            //결과 코드가 200 이라면 성공
            int statusCode = conn.getResponseCode();
            System.out.println("status code : " + statusCode);

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

            // 파싱 결과를 id, nickName, profileImage, email, birthday 변수에 저장
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            Long id = element.getAsJsonObject().get("id").getAsLong();
            String nickName = properties.get("nickname").getAsString();
            String email = kakao_account.get("email").getAsString();
            String birthday = kakao_account.get("birthday").getAsString();
            String profileImage = kakao_account.get("profile").getAsJsonObject().get("profile_image_url").getAsString();
            System.out.println("id : " + id);
            System.out.println("nickName : " + nickName);
            System.out.println("email : " + email);
            System.out.println("birthday : " + birthday);
            System.out.println("profileImage : " + profileImage);
            System.out.println("parsing 완료");

            // member 객체 셋팅
            member.setKakaoId(id + "");
            member.setNickName(nickName);
            member.setImageUrl(profileImage);
            member.setEmail(email);
//            member.setBirthday(birthday);
            member.setAccessToken(accessToken);
            // member.setRefreshToken(getAccessToken(accessToken).getMember().getRefreshToken());
            System.out.println("member : " + member.toString());
            System.out.println("member setting 완료");

//            memberRepository.save(member);
//            System.out.println("member DB 저장 완료");

            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return member;
    }

    /**
     * 최조 로그인 한 사용자에 대해서 SignUpInfo 를 입력 받아서 DB 저장
     * @param signUpInfo
     * @return
     */
    public boolean signUp(SignUpInfo signUpInfo){

        Member member = null;

        try {
            // 입력받은 access_token 을 이용하여 사용자 정보 조회
            member = getUserInfo(signUpInfo.getAccessToken());
        } catch (IOException e){
            e.printStackTrace();
            return false;
        }
        // memberId 셋팅 및 DB 저장
//        member.setMemberId(signUpInfo.getMemberId());
        memberRepository.save(member);

        // 데이터베이스 저장 여부 반환 (회원 정보가 존재하면 true, 존재하지 않으면 false)
        return memberRepository.existsById(member.getKakaoId());
    }

    /**
     * 최조 로그인 한 사용자인지 아닌지 kakaoId 를 이용해 DB 조회
     * @param kakaoId
     * @return
     */
    public boolean checkExist(String kakaoId){
        // 데이터베이스 저장 여부 반환 (회원 정보가 존재하면 true, 존재하지 않으면 false)
        return memberRepository.existsById(kakaoId);
    }

}
