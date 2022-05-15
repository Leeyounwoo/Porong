package com.porong.common.service;

import com.porong.common.domain.Member;
import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.MemberHasCapsule;
import com.porong.common.domain.capsule.Post;
import com.porong.common.dto.capsule.CreateCapsuleDto;
import com.porong.common.dto.capsule.CreatePostDto;
import com.porong.common.dto.capsule.RequestAccessDto;
import com.porong.common.exception.TargetNotFoundException;
import com.porong.common.repository.capsule.CapsuleRepository;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.capsule.MemberHasCapsuleRepository;
import com.porong.common.repository.capsule.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CapsuleService {

    private final CapsuleRepository capsuleRepository;
    private final PostRepository postRepository;
    private final MemberHasCapsuleRepository memberHasCapsuleRepository;
    private final MemberRepository memberRepository;

    /**
     * 사용자와 캡슐 사이의 거리 계산
     * @param capsuleLat
     * @param capsuleLon
     * @param userLat
     * @param userLon
     * @return
     */
    public double calcDistance(double capsuleLat, double capsuleLon, double userLat, double userLon){

        double theta = capsuleLon - userLon;
        double redTheta = Math.sin(theta * Math.PI / 180.0);
        double redCapsuleLat = Math.sin(capsuleLat * Math.PI / 180.0);
        double redUserLat = Math.sin(userLat * Math.PI / 180.0);

        double distance = Math.sin(redUserLat) * Math.sin(redCapsuleLat)
                + Math.cos(redUserLat) * Math.cos(redCapsuleLat) * Math.cos(redTheta);

        distance = Math.acos(distance);
        distance = distance * 180 / Math.PI;
        distance = distance * 60 * 1.1515 * 1609.344;

        return distance;
    }

    /**
     * 사용자의 캡슐 조회 자격 판단
     * @param requestAccessDto
     * @return
     */
    public String accessCapsule(RequestAccessDto requestAccessDto){

        Long capsuleId = requestAccessDto.getCapsuleId();
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot calculate capsule and user's position");
        }
        Capsule capsule = optionalCapsule.get();

        // 사용자가 조회하는 시간이 캡슐 조회 가능 시간과 같거나 이후인지 판단
        LocalDateTime capsuleTime = capsule.getDueTime();
        LocalDateTime userTime = LocalDateTime.now();
        if (!(userTime.isAfter(capsuleTime) || userTime.isEqual(capsuleTime))){
            return "fail time";
        }

        // 캡슐에 소속된 회원인지 판단
        Long memberId = requestAccessDto.getMemberId();
        List<MemberHasCapsule> validationSampleList = capsule.getMemberHasCapsuleList();
        List<Long> validationList = new ArrayList<>();
        for (int i = 0; i < validationSampleList.size(); i++) {
            validationList.add(validationSampleList.get(i).getMember().getMemberId());
        }
        if (!validationList.contains(memberId)){
            return "fail member";
        }

        // 사용자가 조회하는 장소가 캡슐로부터 50m 이내인지 판단
        double capsuleLat = capsule.getLatitude(); // 위도는 지구본 세로줄
        double capsuleLon = capsule.getLongitude(); // 경도는 지구본 가로줄
        double userLat = requestAccessDto.getLatitude();
        double userLon = requestAccessDto.getLongitude();

        double distance = calcDistance(capsuleLat, capsuleLon, userLat, userLon);

        System.out.println("capsuleLat : " + capsuleLat);
        System.out.println("capsuleLon : " + capsuleLon);
        System.out.println("userLat : " + userLat);
        System.out.println("userLon : " + userLon);
        System.out.println("distance : " + distance);

        if (distance > 50){
            return "fail position";
        }

        // 모든 조건이 충족되었을 때 success 반환
        return "success";
    }

    /**
     * 캡슐 생성
     * @param createCapsuleDto
     * @return
     */
    public Capsule createCapsule(CreateCapsuleDto createCapsuleDto){

        Capsule capsule = new Capsule();

        capsule.setCapsuleName(createCapsuleDto.getCapsuleName());
        capsule.setDueTime(createCapsuleDto.getDueTime());
        capsule.setLatitude(createCapsuleDto.getLatitude());
        capsule.setLongitude(createCapsuleDto.getLongitude());

        capsuleRepository.save(capsule);
        System.out.println(">>>>>>>>>> 1. 캡슐 정보 save");

        List<Long> memberIdList = createCapsuleDto.getMemberIdList();

        for (int i = 0; i < memberIdList.size(); i++) {
            MemberHasCapsule target = new MemberHasCapsule();
//            System.out.println(">>>>>>>>>> memberIdList " + (i + 1) + "번째 사용자 저장 : " + memberIdList.get(i));
            Member member = memberRepository.findByMemberId(memberIdList.get(i));
            target.setMember(member);
            target.setCapsule(capsule);
            memberHasCapsuleRepository.save(target);
        }
        System.out.println(">>>>>>>>>> 2. 캡슐에 소속시킬 사용자들 save");
        return capsule;
    }

//    /**
//     * 캡슐 생성
//     * (순서를 바꾸어도 디비에 저장되는 id 값을 MemberHasCapsule 과 Capsule 이 여전히 공유함)
//     * @param createCapsuleDto
//     * @return
//     */
//    public Capsule createCapsule(CreateCapsuleDto createCapsuleDto){
//
//        Capsule capsule = new Capsule();
//        capsuleRepository.save(capsule);
//        System.out.println(">>>>>>>>>> 1. 캡슐 껍데기 save");
//
//        List<Long> memberIdList = createCapsuleDto.getMemberIdList();
//        for (int i = 0; i < memberIdList.size(); i++) {
//            MemberHasCapsule target = new MemberHasCapsule();
//            Member member = memberRepository.findByMemberId(memberIdList.get(i));
//            target.setMember(member);
//            target.setCapsule(capsule);
//            memberHasCapsuleRepository.save(target);
//        }
//        System.out.println(">>>>>>>>>> 2. 캡슐에 소속시킬 사용자들 save");
//
//
//        capsule.setCapsuleName(createCapsuleDto.getCapsuleName());
//        capsule.setDueTime(createCapsuleDto.getDueTime());
//        capsule.setLatitude(createCapsuleDto.getLatitude());
//        capsule.setLongitude(createCapsuleDto.getLongitude());
//        capsuleRepository.save(capsule);
//        System.out.println(">>>>>>>>>> 3. 캡슐 정보들 save");
//
////        List<Member> memberList = createCapsuleDto.getMemberList();
////        List<MemberHasCapsule> memberHasCapsuleList = new ArrayList<>();
////
////        for (int i = 0; i < memberList.size(); i++) {
////            memberHasCapsuleList.get(i).setMember(memberList.get(i));
////            memberHasCapsuleList.get(i).setCapsule(capsule);
////            memberHasCapsuleRepository.save(memberHasCapsuleList.get(i));
////        }
//
//        return capsule;
//    }

    /**
     * 포스트 생성
     * @param createPostDto
     * @return
     */
    public String createPost(CreatePostDto createPostDto){

        Long memberId = createPostDto.getMemberId();
        Member member = memberRepository.findByMemberId(memberId);

        Long capsuleId = createPostDto.getCapsuleId();
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot create post into capsule");
        }
        Capsule capsule = optionalCapsule.get();

        // 캡슐에 소속된 회원인지 판단
        List<MemberHasCapsule> validationSampleList = capsule.getMemberHasCapsuleList();
        List<Long> validationList = new ArrayList<>();
        for (int i = 0; i < validationSampleList.size(); i++) {
            validationList.add(validationSampleList.get(i).getMember().getMemberId());
        }
        if (!validationList.contains(memberId)){
            return "fail member";
        }

        Post post = new Post();

        post.setPostTitle(createPostDto.getPostTitle());
        post.setPostContent(createPostDto.getPostContent());
        post.setDueTime(createPostDto.getDueTime());
        post.setLatitude(createPostDto.getLatitude());
        post.setLongitude(createPostDto.getLongitude());

        post.setCapsule(capsule);
        post.setMember(member);

        double postLat = post.getLatitude();
        double postLon = post.getLongitude();
        double capsuleLat = capsule.getLatitude();
        double capsuleLon = capsule.getLongitude();

        double distance = calcDistance(postLat, postLon, capsuleLat, capsuleLon);

        System.out.println("postLat : " + postLat);
        System.out.println("postLon : " + postLon);
        System.out.println("capsuleLat : " + capsuleLat);
        System.out.println("capsuleLon : " + capsuleLon);
        System.out.println("distance : " + distance);

        // 사용자(게시글)의 위치가 캡슐로부터 50m 이내인지 판단
        if (distance > 50){
            return "fail position";
        }

        postRepository.save(post);
        return "success";
    }

    /**
     * 캡슐 단건 조회
     * @param capsuleId
     * @return
     */
    public Capsule getCapsule(Long capsuleId){
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot find capsule from db");
        }
        Capsule capsule = optionalCapsule.get();

        return capsule;
    }

    /**
     * 포스트 단건 조회
     * @param postId
     * @return
     */
    public Post getPost(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new TargetNotFoundException("post is null, cannot find post from db");
        }
        Post post = optionalPost.get();
        return post;
    }

    /**
     * 캡슐 여러건 조회 (사용자 기준)
     * @param memberId
     * @return
     */
    public List<Capsule> getCapsuleList(Long memberId){

        Member member = memberRepository.findByMemberId(memberId);
        List<Capsule> capsuleList = new ArrayList<>();
        List<MemberHasCapsule> memberHasCapsuleList = memberHasCapsuleRepository.findAllByMember(member);

        for (int i = 0; i < memberHasCapsuleList.size(); i++) {
            capsuleList.add(memberHasCapsuleList.get(i).getCapsule());
        }
        return capsuleList;
    }

    /**
     * 포스트 여러건 조회 (캡슐 기준)
     * @param capsuleId
     * @return
     */
    public List<Post> getPostList(Long capsuleId){
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot find post list from db");
        }
        Capsule capsule = optionalCapsule.get();

        List<Post> postList = capsule.getPostList();
        return postList;
    }

    /**
     * 맴버 전체 조회 (캡슐 기준)
     * @param capsuleId
     * @return
     */
    public List<Member> getCapsuleMemberList(Long capsuleId){

        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot find member list from db");
        }
        Capsule capsule = optionalCapsule.get();

        List<Member> memberList = new ArrayList<>();
        List<MemberHasCapsule> memberHasCapsuleList = memberHasCapsuleRepository.findAllByCapsule(capsule);

        for (int i = 0; i < memberHasCapsuleList.size(); i++) {
            memberList.add(memberHasCapsuleList.get(i).getMember());
        }
        return memberList;
    }

}
