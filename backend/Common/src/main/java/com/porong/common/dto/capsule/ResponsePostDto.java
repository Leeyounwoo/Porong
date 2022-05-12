package com.porong.common.dto.capsule;

import com.porong.common.domain.capsule.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePostDto {
    private String result;
    private Post post;
}
