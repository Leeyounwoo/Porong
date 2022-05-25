package com.porong.common.repository.capsule;

import com.porong.common.domain.capsule.Capsule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
    Optional<Capsule> findById(Long capsuleId);
}
