package com.porong.common.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.porong.common.dto.firebase.FcmNormalNotifyMessage;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FirebaseFCMConfig {

    private final String POST_API_URL = "https://fcm.googleapis.com/v1/projects/c102-d214f/messages:send";
    private final MemberRepository MEMBER_REPOSITORY;
    private final ObjectMapper objectMapper;

    public void postNormalMessage(long fromMemberId, long toMemberId) throws Exception {
        if(!MEMBER_REPOSITORY.existsByMemberId(toMemberId)) throw new Exception();

        String targetToken = MEMBER_REPOSITORY.findByMemberId(toMemberId).getFcmToken();
        String title = "새로운 메시지가 도착했습니다.";
        String body = "사랑합니다.";

        System.out.println("목적지 토큰 : " + targetToken);

        String message = makeMessage(targetToken, title, body);

        OkHttpClient okHttpClient = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                                     .url(POST_API_URL)
                                     .post(requestBody)
                                     .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                                     .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                                     .build();

        System.out.println("액세스 토큰 : Bearer " + getAccessToken());

        Response response = okHttpClient.newCall(request).execute();
        System.out.println(response.body().string());
    }

    public String makeMessage(String targetToken, String title, String body) throws JsonProcessingException {
        FcmNormalNotifyMessage fcmNormalNotifyMessage = FcmNormalNotifyMessage.builder()
                                                                              .validate_only(false)
                                                                              .message(FcmNormalNotifyMessage.NormalMessage.builder()
                                                                                                                           .token(targetToken)
                                                                                                                           .notification(FcmNormalNotifyMessage.Notification.builder()
                                                                                                                                                                            .title(title)
                                                                                                                                                                            .body(body)
                                                                                                                                                                            .build())
                                                                                                                           .build())
                                                                              .build(); // 메시지 내용 추가 구현필요
        return objectMapper.writeValueAsString(fcmNormalNotifyMessage);
    }

    private String getAccessToken() throws Exception {
        String firebaseConfigPath = "firebase/firebase_serviceKey.json";

        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                                                                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }


}
