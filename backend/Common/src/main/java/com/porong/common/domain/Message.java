package com.porong.common.domain;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "message")
public class Message {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberId;

    @Setter
    @Enumerated(EnumType.STRING)
    private MessageType type = MessageType.Normal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // sender_Id, member 추가 후 import 필요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "created_at")
    private LocalDateTime dueTime;


    @Column(name = "is_checked")
    private boolean isChecked;

    @Column(name = "is_deleted")
    private boolean isDeleted;


    @Column(length = 2200, nullable = false)
    private String title;

    @Column(length = 2200)
    private String contentText;

    @Column(length = 2200)
    private String contentUrl;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

}
