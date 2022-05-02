package com.porong.gateway.exception;

public class UnAuthorizedException extends RuntimeException {
    private static final long serialVersionUID = -2238030302650813813L;
    public UnAuthorizedException() {
        super("권한이 유효하지 않습니다.");
    }
}
