package com.porong.common.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RequestBetweenMessagesDto implements Serializable {

    private Long myMemberId;
    private Long friendMemberId;

}
