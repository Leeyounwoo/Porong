package com.porong.common.repository.capsule;

import com.porong.common.domain.Member;
import com.porong.common.domain.capsule.MemberHasCapsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberHasCapsuleRepository extends JpaRepository<MemberHasCapsule, Long> {
}
