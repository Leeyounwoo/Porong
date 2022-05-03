package com.porong.common.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "follow")
public class Follow {
    @Id
    @Column(name = "follow_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long followId;

    @ManyToOne
    private Member following; //

    @ManyToOne
    private Member follower;
}
