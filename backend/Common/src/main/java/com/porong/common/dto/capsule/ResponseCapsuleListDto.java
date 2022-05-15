package com.porong.common.dto.capsule;

import com.porong.common.domain.capsule.Capsule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCapsuleListDto {
    private String result;
    private List<Capsule> capsuleList;
}
