package com.porong.common.dto.capsule;

import com.porong.common.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCapsuleDto {
    private String capsuleName;
    private double latitude;
    private double longitude;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dueTime;

    private List<Member> memberList;
}
