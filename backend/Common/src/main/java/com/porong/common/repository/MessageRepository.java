package com.porong.common.repository;

import com.porong.common.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

//    @Query("SELECT m from message m join fetch m.post where c.post.postId=:postId and c.commentId>0 order by c.commentId ASC ")
//    public List<Message> findByPostId(@Param("messageId") Long messageId);

}
