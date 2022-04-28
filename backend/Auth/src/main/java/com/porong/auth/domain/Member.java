package com.porong.auth.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Member")
public class Member {

    @Id
    private String kakaoId;

    private String memberId;

    private String accessToken;

    private String refreshToken;

    private String nickName;

    private String imageUrl;

    private String email;

    private String birthday;

}
