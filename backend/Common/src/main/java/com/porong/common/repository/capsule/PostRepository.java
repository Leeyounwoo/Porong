package com.porong.common.repository.capsule;

import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCapsule(Capsule capsule);
}