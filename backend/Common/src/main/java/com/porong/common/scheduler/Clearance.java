package com.porong.common.scheduler;

//import com.porong.common.repository.MemberRepository;
//import com.porong.common.repository.MessageRepository;
import com.porong.common.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class Clearance {
    // isDeleted = 1 인거 하루에 한번 일괄 삭제

    private final MessageRepository messageRepository;

    @Transactional
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul") // 매일 오전 7시에 메세지 일괄 삭제
    public int deleteUserHashTag() {
        return messageRepository.deleteAllByIs_deletedIsTrue();
    }

}
