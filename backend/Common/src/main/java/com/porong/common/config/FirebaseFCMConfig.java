package com.porong.common.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.porong.common.domain.Message;
import com.porong.common.dto.firebase.FcmNormalNotifyMessage;
import com.porong.common.dto.message.RequestCreateMessageDto;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FirebaseFCMConfig {

    private final String POST_API_URL = "https://fcm.googleapis.com/v1/projects/c102-d214f/messages:send";
    private final MemberRepository MEMBER_REPOSITORY;
    private final ObjectMapper objectMapper;

    public void postNormalMessage(RequestCreateMessageDto requestCreateMessageDto, String senderName, long toMemberId, long messageId) throws Exception {
        if(!MEMBER_REPOSITORY.existsByMemberId(toMemberId)) throw new Exception();

        String targetToken = MEMBER_REPOSITORY.findByMemberId(toMemberId).getFcmToken();

        String message = makeNormalMessage(targetToken, requestCreateMessageDto, senderName, messageId);

        OkHttpClient okHttpClient = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                                     .url(POST_API_URL)
                                     .post(requestBody)
                                     .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                                     .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                                     .build();

        Response response = okHttpClient.newCall(request).execute();
        System.out.println(response.body().string());
    }

    public String makeNormalMessage(String targetToken, RequestCreateMessageDto requestCreateMessageDto, String senderName, long messageId) throws JsonProcessingException {

        String title = "새로운 메시지가 도착했습니다.";
        String body = senderName + "님이 위도 : " + requestCreateMessageDto.getLatitude() + ", 경도 : " + requestCreateMessageDto.getLongitude() + " 에서 볼 수 있는 메시지를 보냈습니다.";

        HashMap<String, String> dataMap = new HashMap<>();
        dataMap.put("alertId", requestCreateMessageDto.getDueTime().toString());
        dataMap.put("alertType", "message_condition");
        dataMap.put("messageId", String.valueOf(messageId));
        dataMap.put("senderNickname", senderName);
        dataMap.put("place", "장덕동 1333"); // 수정 필요
        dataMap.put("time", "2022년 5월 16일 00시 00분");

        FcmNormalNotifyMessage fcmNormalNotifyMessage = FcmNormalNotifyMessage.builder()
                                                                              .validate_only(false)
                                                                              .message(FcmNormalNotifyMessage.NormalMessage.builder()
                                                                                                                           .token(targetToken)
                                                                                                                           .data(dataMap)
                                                                                                                           .notification(FcmNormalNotifyMessage.Notification.builder()
                                                                                                                                                                            .title(title)
                                                                                                                                                                            .body(body)
                                                                                                                                                                            .build())
                                                                                                                           .build())
                                                                              .build(); // 메시지 내용 추가 구현필요
        return objectMapper.writeValueAsString(fcmNormalNotifyMessage);
    }

    public void postSatisfyMessage(Message message) throws Exception {
        if(!MEMBER_REPOSITORY.existsByMemberId(message.getReceiver().getMemberId())) throw new Exception();

        String targetToken = MEMBER_REPOSITORY.findByMemberId(message.getReceiver().getMemberId()).getFcmToken();

        String FCMmessage = makeSatisfyMessage(message);

        OkHttpClient okHttpClient = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(FCMmessage, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                .url(POST_API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = okHttpClient.newCall(request).execute();
        System.out.println(response.body().string());
    }

    public String makeSatisfyMessage(Message message) throws JsonProcessingException {

        String title = "메시지가 도착했습니다.";
        String body = message.getLocation() + "에서 " + message.getSender().getName() + "님이 보낸 메시지를 받았습니다.";

        HashMap<String, String> dataMap = new HashMap<>();
        dataMap.put("alertId", message.getDueTime().toString());
        dataMap.put("messageId", String.valueOf(message.getMessageId()));
        dataMap.put("alertType", "message_receive");
        dataMap.put("senderNickname", message.getSender().getName());
        dataMap.put("place", "장덕동 1333"); // 수정 필요

        FcmNormalNotifyMessage fcmNormalNotifyMessage = FcmNormalNotifyMessage.builder()
                .validate_only(false)
                .message(FcmNormalNotifyMessage.NormalMessage.builder()
                                                             .token(message.getReceiver().getFcmToken())
                                                             .data(dataMap)
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
