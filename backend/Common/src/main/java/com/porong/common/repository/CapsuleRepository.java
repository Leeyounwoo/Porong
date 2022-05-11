package com.porong.common.repository;

import com.porong.common.domain.capsule.Capsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
}
