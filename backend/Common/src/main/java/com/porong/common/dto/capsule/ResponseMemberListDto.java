package com.porong.common.dto.capsule;

import com.porong.common.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMemberListDto {
    private String result;
    private List<Member> memberList;
}
