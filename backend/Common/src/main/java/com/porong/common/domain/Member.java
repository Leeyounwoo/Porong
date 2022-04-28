package com.porong.common.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter // 추후
@Setter // 수정
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "member_kakao_id")
    private Long kakaoId;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_phonenumber")
    private String phoneNumber;

    @OneToMany
    @Column(name = "member_following_list")
    private List<Follow> followingList = new ArrayList<>();
}
