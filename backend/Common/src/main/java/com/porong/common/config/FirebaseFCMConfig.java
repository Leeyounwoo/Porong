package com.porong.common.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.porong.common.domain.Member;
import com.porong.common.domain.Message;
import com.porong.common.dto.firebase.FcmNormalNotifyMessage;
import com.porong.common.dto.message.RequestCreateMessageDto;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FirebaseFCMConfig {

    private final String POST_API_URL = "https://fcm.googleapis.com/v1/projects/c102-d214f/messages:send";
    private final MemberRepository MEMBER_REPOSITORY;
    private final ObjectMapper objectMapper;

    public void postNormalMessage(Message message, Member sender, Member receiver) throws Exception {
        if(!MEMBER_REPOSITORY.existsByMemberId(receiver.getMemberId())) throw new Exception();

        String targetToken = receiver.getFcmToken();

        String normalMessage = makeNormalMessage(message, sender, receiver);

        OkHttpClient okHttpClient = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(normalMessage, MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                                     .url(POST_API_URL)
                                     .post(requestBody)
                                     .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                                     .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                                     .build();

        Response response = okHttpClient.newCall(request).execute();
        System.out.println(response.body().string());
    }

    public String makeNormalMessage(Message message, Member sender, Member receiver) throws JsonProcessingException {

        String title = "새로운 메시지가 도착했습니다.";
        LocalDateTime messageTime = message.getDueTime();
        DateTimeFormatter timePattern = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초");
        DateTimeFormatter alertPattern = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        String time = messageTime.format(timePattern);
        String alertId = messageTime.format(alertPattern);

        String body = sender.getName() + "님이 " + time + " " + message.getLocation() + " 에서 볼 수 있는 메시지를 보냈습니다.";

        HashMap<String, String> dataMap = new HashMap<>();
        dataMap.put("alertId", "A" + alertId);
        dataMap.put("alertType", "message_condition");
        dataMap.put("senderProfile", sender.getProfileUrl());
        dataMap.put("messageId", String.valueOf(message.getMessageId()));
        dataMap.put("senderNickname", sender.getName());
        dataMap.put("place", message.getLocation());
        dataMap.put("time", time);
        dataMap.put("latitude", String.valueOf(message.getLatitude()));
        dataMap.put("longitude", String.valueOf(message.getLongitude()));

        FcmNormalNotifyMessage fcmNormalNotifyMessage = FcmNormalNotifyMessage.builder()
                                                                              .validate_only(false)
                                                                              .message(FcmNormalNotifyMessage.NormalMessage.builder()
                                                                                                                           .token(receiver.getFcmToken())
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
        LocalDateTime messageTime = message.getDueTime();
        DateTimeFormatter alertPattern = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        String alertId = messageTime.format(alertPattern);

        String body = message.getLocation() + "에서 " + message.getSender().getName() + "님이 보낸 메시지를 받았습니다.";

        HashMap<String, String> dataMap = new HashMap<>();
        dataMap.put("alertId", "A" + alertId);
        dataMap.put("messageId", String.valueOf(message.getMessageId()));
        dataMap.put("alertType", "message_receive");
        dataMap.put("senderNickname", message.getSender().getName());
        dataMap.put("place", message.getLocation());

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
