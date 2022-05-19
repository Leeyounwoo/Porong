package com.porong.common.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.porong.common.config.FirebaseFCMConfig;
import com.porong.common.domain.Member;
import com.porong.common.domain.Message;
import com.porong.common.dto.message.*;
import com.porong.common.exception.MemberNotFoundException;
import com.porong.common.exception.MessageCancelImpossibleException;
import com.porong.common.exception.MessageNotFoundException;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MessageService {

    private final MemberRepository memberRepository;
    private final MessageRepository messageRepository;
    private final FirebaseFCMConfig firebaseFCMConfig;

    // 메세지 보내기
    @Transactional
    public Long postMessage(RequestCreateMessageDto requestCreateMessageDto) {

        Long senderId = requestCreateMessageDto.getSenderId();

        Optional<Member> optionalSender = memberRepository.findById(senderId);
        if (optionalSender.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member sender = optionalSender.get();

        Long receiverId = requestCreateMessageDto.getReceiverId();

        Optional<Member> optionalReceiver = memberRepository.findById(receiverId);
        if (optionalReceiver.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member receiver = optionalReceiver.get();

        String coordinate =  requestCreateMessageDto.getLongitude() +","+ requestCreateMessageDto.getLatitude();

        String location = "";

        Message message = new Message(requestCreateMessageDto, sender, receiver, location); // location 추가

        messageRepository.save(message);
        Long messageId = message.getMessageId();

        // FCM 알림 로직 시작
        try {
            firebaseFCMConfig.postNormalMessage(message, sender, receiver);
        }
        catch (Exception e) {
            new MemberNotFoundException();
        }
        // FCM 알림 로직 끝

        return messageId;
    }


    // 메세지 취소
    @Transactional
    public void deleteMessage(Long messageId) {

        // 확인을 안했고, 즉 isChecked 가 0 이면서 SenderId 가 신청을 헀을때 메세지 취소

        Optional<Message> optionalMessage = messageRepository.findById(messageId);
        if (optionalMessage.isEmpty()) {
            throw new MessageNotFoundException();
        }
        Message message = optionalMessage.get();

        if (message.isDeleted() == false && message.isChecked() == false) {
            message.deleteMessage(); // isDeleted = 0 -> isDeleted = 1
        }

        // 이미 수신자가 읽었다면 에러 발생
        if (message.isChecked() == true) {
            throw new MessageCancelImpossibleException();
        }

    }


    // 확인 안한 메세지 모두 조회 dueTime 빠른 순으로 정렬
    public List<ResponseUnCheckedMessageDto> fetchUnCheckedMessages(Long memberId) {
        // memberId로 멤버 불러온 뒤 receiver.memberId 및 isCheck = 0 , isDeleted = 0 인거 리스트로 불러오기

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        List<Message> messages = messageRepository.findUnCheckedMessagesByMemberId(member.getMemberId());


        // 빨리 확인할 수 있는 순으로 정렬 dueTime 이 빠른 순으로 정렬!
        Collections.sort(messages, new MessageComparator());

        List<ResponseUnCheckedMessageDto> responseUnCheckedMessageDtos = messages.stream().map(ResponseUnCheckedMessageDto::new).collect(Collectors.toList());

        return responseUnCheckedMessageDtos;
    }


    // 메세지 조회
    @Transactional
    public ResponseCheckedMessageDto getMessage(RequestMessageDto requestMessageDto) {
        // isDeleted = 0 인 것들 중에서

        // 수신자가 봤던 거라면, 즉 isChecked = 1 이라면, 제약 없이 바로 확인 가능
        // 아직 확인을 안했다면, 제약 시간을 검증 후 response 후 isCheked = 0 -> isChecked = 1

        Long memberId = requestMessageDto.getMemberId();

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        Long messageId = requestMessageDto.getMessageId();

        Optional<Message> optionalMessage = messageRepository.findById(messageId);
        if (optionalMessage.isEmpty()) {
            throw new MessageNotFoundException();
        }
        Message message = optionalMessage.get();


        // 이미 확인 했다면, 수신자 발신자 모두 제약없이 확인이 가능함
        if (message.isChecked() == true) {

            ResponseCheckedMessageDto responseCheckedMessageDto = new ResponseCheckedMessageDto(message);

            return responseCheckedMessageDto;

        }

        // 보낸 사람은 아무 제약 없이 확인이 가능함
        if (message.getSender().equals(member)) {

            ResponseCheckedMessageDto responseCheckedMessageDto = new ResponseCheckedMessageDto(message);

            return responseCheckedMessageDto;

        }

        // member 가 수신자였을때 -> message.getReceiver() == member
        // 메세지 위치 정보 파악은 프론트랑 협의 후 로직 구성
        // 시간 비교, 실제 로직에서 시간 찍어보기

       /*if (requestMessageDto.getTimeNow().isAfter(message.getDueTime()) || requestMessageDto.getTimeNow().isEqual(message.getDueTime()) ) {

           // message.checkMessage(); // isChecked = 0 -> isChecked = 1  postsatisfy로 옮김

           ResponseCheckedMessageDto responseCheckedMessageDto = new ResponseCheckedMessageDto(message);

           return responseCheckedMessageDto;
       }

        ResponseCheckedMessageDto responseCheckedMessageDto = new ResponseCheckedMessageDto();*/

        ResponseCheckedMessageDto responseCheckedMessageDto = new ResponseCheckedMessageDto(message);

       return responseCheckedMessageDto; // 해당 없으면 빈 값 반환

    }

    public void postSatisfyMessage(long messageId) throws Exception {
        if(!messageRepository.existsById(messageId)) throw new Exception();

        Message message = messageRepository.getById(messageId);

        // 본문 만족 알림 로직 시작
        try {
            firebaseFCMConfig.postSatisfyMessage(message);
        }
        catch (Exception e) {
            throw new MessageNotFoundException();
        }
        // 본문 만족 알림 로직 끝
    }


    // 받은 메세지 전체 조회 // 정렬 기능 추가 필요
    public List<ResponseReceivedMessageDto> getReceivedMessages(Long memberId) {
        // memberId 로 찾은 후
        // receiverId 로 가져오고, isDeleted = 0 인거 가져옴

        // 우선 시간 조건 만족 안한거 timeNow 랑 dueTime 비교 한후 timeNow isafter dueTime들 가져오고 // check 필요
        // dueTime 작은 순대로 정렬 -> comparator

        // 시간 조건 만족한 메세지들 timeNow isbefore dueTime 메세지들 가져오고 // check 필요
        // dueTime 큰 순서대로 정렬 -> comparator

        // 가져온 후 두개를 합 침 // 빈곳에 채워넣음

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        List<Message> messages = messageRepository.findReceivedMessagesByMemberId(member.getMemberId());

        List<Message> timeUnValidMessages = new ArrayList<Message>();

        List<Message> timeValidMessages = new ArrayList<Message>();

        List<Message> combinedMessages = new ArrayList<Message>();

        LocalDateTime timeNow = LocalDateTime.now();

        for (Message m : messages) {
            if (timeNow.isBefore(m.getDueTime())) { // 시간 조건 만족 X
                timeUnValidMessages.add(m);
            }
            else { // 시간 조건 만족 O
                timeValidMessages.add(m);
            }
        }


        Collections.sort(timeUnValidMessages, new MessageComparator()); // 과거 -> 미래 순
        Collections.sort(timeValidMessages, new TimeValidMessageComparator()); // 미래 -> 과거 순


        combinedMessages.addAll(timeUnValidMessages);
        combinedMessages.addAll(timeValidMessages);


        List<ResponseReceivedMessageDto> responseReceivedMessageDtos = combinedMessages.stream().map(ResponseReceivedMessageDto::new).collect(Collectors.toList());

        return responseReceivedMessageDtos;

    }


    // 보낸 메세지 전체 조회 
    public List<ResponseSentMessageDto> getSentMessages(Long memberId) {
        // memberId 로 찾은 후
        // senderId로 찾은 후, isDeleted = 0 인거 가져옴

        // 모두 가져온 후 createdAt이 큰 순서대로 정렬

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        List<Message> messages = messageRepository.findSentMessagesByMemberId(member.getMemberId());

        Collections.sort(messages, new latestMessageComparator()); // 미래 -> 과거 순

        return messages.stream().map(ResponseSentMessageDto::new).collect(Collectors.toList());
    }


    // 확인 안한 메세지들 중 가장 빠른 시간 조건 조회
    public LocalDateTime getRecentMessageTime(Long memberId) {
        // memberId로 recieveId 메세지들 가져온 다음에
        // isChecked = 0 이랑, isDeleted = 0 들 적용 시키고,
        // 확인 안한 메세지들 가져와서 가장 작은 dueTime 반환

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException();
        }
        Member member = optionalMember.get();

        List<Message> messages = messageRepository.findUnCheckedMessagesByMemberId(member.getMemberId());


        // 빨리 확인할 수 있는 순으로 정렬 dueTime 이 빠른 순으로 정렬!
        Collections.sort(messages, new MessageComparator());

        List<ResponseUnCheckedMessageDto> responseUnCheckedMessageDtos = messages.stream().map(ResponseUnCheckedMessageDto::new).collect(Collectors.toList());

        return responseUnCheckedMessageDtos.get(0).getDueTime();

    }

    // 보류
    // 해당 멤버와 주고 받은 (확인한? 확인안한것들까지?) 메세지들을 조회 // 체크 필요
//    public List<ResponseMessageDto> fetchMessagesByMember(RequestBetweenMessagesDto RequestBetweenMessagesDto) {
//        // 두명의 member 가져온 후
//        // 각각 sender, reciever 바꾸면서 메세지들 가져온 다음에 createdAt? dueTime 순으로 정렬
//        // 모두 합치고 반환
//
//        Long senderId = requestCreateMessageDto.getSenderId();
//
//        Optional<Member> optionalSender = memberRepository.findById(senderId);
//        if (optionalSender.isEmpty()) {
//            throw new MemberNotFoundException();
//        }
//        Member sender = optionalSender.get();
//
//        Long receiverId = requestCreateMessageDto.getReceiverId();
//
//        Optional<Member> optionalReceiver = memberRepository.findById(receiverId);
//        if (optionalReceiver.isEmpty()) {
//            throw new MemberNotFoundException();
//        }
//        Member receiver = optionalReceiver.get();
//
//        return messageId;
//    }


    class MessageComparator implements Comparator<Message> {
        @Override
        public int compare(Message a, Message b) {
            if (a.getDueTime().isBefore((b.getDueTime()))) return -1; // 오름차순 dueTime 빠른 순으로 정렬 작은거에서 큰거
            if (a.getDueTime().isBefore(b.getDueTime())) return 1;
            return 0;
        }
    }

    class TimeValidMessageComparator implements Comparator<Message> {
        @Override
        public int compare(Message a, Message b) {
            if (a.getDueTime().isAfter((b.getDueTime()))) return -1; // 내림차순 dueTime 느린 순으로 정렬 큰거에서 작은거
            if (a.getDueTime().isAfter(b.getDueTime())) return 1;
            return 0;
        }
    }

    class latestMessageComparator implements Comparator<Message> {
        @Override
        public int compare(Message a, Message b) {
            if (a.getCreatedAt().isAfter((b.getCreatedAt()))) return -1; // 내림차순 dueTime 느린 순으로 정렬 큰거에서 작은거
            if (a.getCreatedAt().isAfter(b.getCreatedAt())) return 1;
            return 0;
        }
    }

    public String get(String coordinate) {
        try {
            HttpClient client = HttpClientBuilder.create().build();
            // legalcode,addr,admcode,roadaddr
            HttpGet getRequest = new HttpGet("https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords="+coordinate+"&output=json&orders=admcode");
            getRequest.setHeader("X-NCP-APIGW-API-KEY-ID", "l2mo0icog8");
            getRequest.setHeader("X-NCP-APIGW-API-KEY", "Gh32v5mM5wjevKKCsVfkRpfaJ3FmP3XmLq7s3eVz");

            HttpResponse response = client.execute(getRequest);

            //Response 출력
            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);

                ObjectMapper mapper = new ObjectMapper();
                JsonNode bodyJson = mapper.readTree(body);

                String area_1 = bodyJson.path("results").path(0).path("region").path("area1").path("name").toString();
                area_1 = area_1.substring(1, area_1.length()-1);
                String area_2 = bodyJson.path("results").path(0).path("region").path("area2").path("name").toString();
                area_2 = area_2.substring(1, area_2.length()-1);
                String area_3 = bodyJson.path("results").path(0).path("region").path("area3").path("name").toString();
                area_3 = area_3.substring(1, area_3.length()-1);

                String location = area_1.concat(" ").concat(area_2).concat(" ").concat(area_3);

                return location;

            } else {
                return null;
            }

        } catch (Exception e) {
            return null;
        }
    }




}
