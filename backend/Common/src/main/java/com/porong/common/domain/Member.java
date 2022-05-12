package com.porong.common.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberId;

    @Column(name = "member_kakao_id")
    private Long kakaoId;

    @Column(name = "member_name") // 본명
    private String name;

    @Column(name = "member_email")
    private String email;

    @Column(name = "member_phonenumber") // format : 010xxxxxxxx
    private String phoneNumber;

    @Column(name = "member_profile") // 카카오톡 프로필 사진 url
    private String profileUrl;

    @Column(name = "fcm_token")
    private String fcmToken;

    @OneToMany
    @Column(name = "member_following_list") // 현재 내가 추가한 친구 목록
    private List<Follow> followingList = new ArrayList<>();

    @OneToMany
    @Column(name = "member_follower_list") // 차단 기능을 위해
    private List<Follow> followerList = new ArrayList<>();
}
