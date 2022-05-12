package com.porong.common.repository.capsule;

import com.porong.common.domain.Member;
import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface CapsuleRepository extends JpaRepository<Capsule, Long> {
}
