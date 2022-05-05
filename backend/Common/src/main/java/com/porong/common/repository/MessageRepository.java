package com.porong.common.repository;

import com.porong.common.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // 확인 안한 메세지들 목록
    @Query("SELECT m from Message m join fetch m.receiver where m.receiver.memberId=:memberId and m.isChecked = false and m.isDeleted = false")
    List<Message> findUnCheckedMessagesByMemberId(@Param("memberId") Long memberId);

    // 받은 메세지들 목록
    @Query("SELECT m from Message m join fetch m.receiver where m.receiver.memberId=:memberId and m.isDeleted = false")
    List<Message> findReceivedMessagesByMemberId(@Param("memberId") Long memberId);

    // 보낸 메세지들 목록
    @Query("SELECT m from Message m join fetch m.sender where m.sender.memberId=:memberId and m.isDeleted = false")
    List<Message> findSentMessagesByMemberId(@Param("memberId") Long memberId);

    // 메세지 일괄 삭제
    @Modifying
    @Query("delete from Message where isDeleted = true")
    int deleteAllByIs_deletedIsTrue();

}
