package com.porong.common.dto;

import lombok.Data;

@Data
public class FollowDto {
    private long fromMemberId;
    private long toMemberId;
}
