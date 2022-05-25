package com.porong.common.repository.capsule;

import com.porong.common.domain.Member;
import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.MemberHasCapsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberHasCapsuleRepository extends JpaRepository<MemberHasCapsule, Long> {
    List<MemberHasCapsule> findAllByMember(Member member);
    List<MemberHasCapsule> findAllByCapsule(Capsule capsule);
}
