package com.porong.common.service;

import com.porong.common.domain.Follow;
import com.porong.common.domain.Member;
import com.porong.common.dto.SignupDto;
import com.porong.common.dto.authenticateDto;
import com.porong.common.dto.verifyDto;
import com.porong.common.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Balance;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.MessageListRequest;
import net.nurigo.sdk.message.request.MultipleMessageSendingRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MessageListResponse;
import net.nurigo.sdk.message.response.MultipleMessageSentResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository MEMBER_REPOSITORY;
    private final DefaultMessageService messageService = NurigoApp.INSTANCE.initialize("NCSOD4MYUWGPQGGT", "CFK0T3ASXGJBC9MFTW9EP1FO0IKNNNWT", "https://api.coolsms.co.kr");
    private final ConcurrentHashMap<Long, String> authenticationNumber = new ConcurrentHashMap<>();

    @Override
    public void signup(SignupDto signupDto) throws Exception {
        if(!MEMBER_REPOSITORY.existsByPhoneNumber(signupDto.getPhoneNumber())) {
            try {
                Member member = new Member();
                member.setKakaoId(signupDto.getKakaoId());
                member.setName(signupDto.getName());
                member.setEmail(signupDto.getEmail());
                member.setPhoneNumber(signupDto.getPhoneNumber());
                member.setProfileUrl(signupDto.getProfileUrl());

                MEMBER_REPOSITORY.save(member);
            }
            catch (Exception e) {
                throw e;
            }
        }
    }

    @Override
    public void authenticate(authenticateDto authenticateDto) throws Exception {
        try {
            Random randPackage = new Random();
            String randomNum = "";

            for(int i=0; i<6; i++) {
                int random = randPackage.nextInt(10);
                randomNum += String.valueOf(random);
            }

            Message message = new Message();
            message.setFrom("01041084206");
            message.setTo(authenticateDto.getPhoneNumber());
            message.setText("마음 사서함 인증번호는 " + randomNum + " 입니다.");

            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            System.out.println(response);

            if(authenticationNumber.containsKey(authenticateDto.getKakaoId())) authenticationNumber.remove(authenticateDto.getKakaoId());
            authenticationNumber.put(authenticateDto.getKakaoId(), randomNum);
        }
        catch (Exception e) {
            throw e;
        }
    }

    @Override
    public void verify(verifyDto verifyDto) throws Exception {
        Exception e = new Exception();

        if(authenticationNumber.get(verifyDto.getKakaoId()).equals(verifyDto.getNumber())) return;
        else throw e;
    }
}
