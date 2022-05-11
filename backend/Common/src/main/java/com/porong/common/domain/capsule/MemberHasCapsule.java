package com.porong.common.domain.capsule;

import com.porong.common.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberHasCapsule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_has_capsule_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(targetEntity = Capsule.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "capsule_id")
    private Capsule capsule;
}
