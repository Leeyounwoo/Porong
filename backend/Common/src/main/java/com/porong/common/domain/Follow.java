package com.porong.common.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter // 추후
@Setter // 수정
@Table(name = "follow")
public class Follow {
    @Id
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne
    private Member following; //

    @ManyToOne
    private Member follower;
}
