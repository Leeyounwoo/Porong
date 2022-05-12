package com.porong.common.dto.capsule;

import com.porong.common.domain.capsule.Capsule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCapsuleDto {
    private String result;
    private Capsule capsule;
}
