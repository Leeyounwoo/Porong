package com.porong.common.dto.capsule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestAccessDto {
    private Long capsuleId;
    private Long memberId;
    private double latitude;
    private double longitude;
}
