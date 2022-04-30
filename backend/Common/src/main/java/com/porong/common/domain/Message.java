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
    @Column(name = "message_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long messageId;

//    @Enumerated(EnumType.STRING)
//    private MessageType type = MessageType.Normal; // 추후에 사진, 영상 등 추가

    @OneToOne(fetch = FetchType.LAZY) // ManyToOne
    @JoinColumn(name = "member_id") // member_id
    private Member sender; // sender_Id, member 추가 후 import 필요

    @OneToOne(fetch = FetchType.LAZY) // ManyToOne
    @JoinColumn(name = "member_id") // member_id
    private Member receiver;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "due_time")
    private LocalDateTime dueTime;

    @Column(name = "is_checked")
    private boolean isChecked;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(length = 2200, nullable = false)
    private String title;

    @Column(length = 2200)
    private String contentText;

//    @Column(length = 2200)
//    private String contentUrl; // 추후에 사진, 영상 등 추가

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

}
