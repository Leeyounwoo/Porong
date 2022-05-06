package com.porong.common.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "AuthMember")
public class AuthMember {
    @Id
    private Long kakaoId;
//    private String accessToken;
//    private String refreshToken;
    private String nickName;
    private String imageUrl;
}
