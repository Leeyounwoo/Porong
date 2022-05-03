package com.porong.common.repository;

import com.porong.common.domain.Follow;
import com.porong.common.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    Member findByMemberId(long memberId);
    Member findByPhoneNumber(String phoneNumber);
}
