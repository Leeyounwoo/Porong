package com.porong.common.exhandler;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private final String message;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
