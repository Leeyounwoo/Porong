package com.porong.common.dto.firebase;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Getter
@Builder
@AllArgsConstructor
public class FcmNormalNotifyMessage {

    private boolean validate_only;
    private NormalMessage message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class NormalMessage {
        private Notification notification;
        private HashMap<String, String> data;
        private String token;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Notification {
        private String title;
        private String body;
    }
}
