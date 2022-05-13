package com.porong.common.service;

import com.porong.common.domain.Member;
import com.porong.common.domain.Message;
import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.MemberHasCapsule;
import com.porong.common.domain.capsule.Post;
import com.porong.common.dto.capsule.CreateCapsuleDto;
import com.porong.common.dto.capsule.CreatePostDto;
import com.porong.common.dto.capsule.RequestPositionDto;
import com.porong.common.exception.MessageNotFoundException;
import com.porong.common.exception.PositionValidateException;
import com.porong.common.exception.TargetNotFoundException;
import com.porong.common.repository.capsule.CapsuleRepository;
import com.porong.common.repository.MemberRepository;
import com.porong.common.repository.capsule.MemberHasCapsuleRepository;
import com.porong.common.repository.capsule.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
     * @param requestPositionDto
     * @return
     */
    public double calcPosition(RequestPositionDto requestPositionDto){

        Long capsuleId = requestPositionDto.getCapsuleId();
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot calculate capsule and user's position");
        }
        Capsule capsule = optionalCapsule.get();

        double capsuleLat = capsule.getLatitude(); // 위도는 지구본 세로줄
        double capsuleLon = capsule.getLongitude(); // 경도는 지구본 가로줄
        double userLat = requestPositionDto.getLatitude();
        double userLon = requestPositionDto.getLongitude();

        System.out.println("capsuleLatitude : " + capsuleLat);
        System.out.println("capsuleLongitude : " + capsuleLon);
        System.out.println("userLatitude : " + userLat);
        System.out.println("userLongitude : " + userLon);

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
     * 캡슐 생성
     * (기능 테스트 후 초대 절차를 분리할지 고려 --> 5/13 분리 안함)
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
        System.out.println(">>>>>>>>>> 먼저 캡슐 정보 save 완료");

//        List<Member> memberList = createCapsuleDto.getMemberList();
//        List<MemberHasCapsule> memberHasCapsuleList = new ArrayList<>();
//
//        for (int i = 0; i < memberList.size(); i++) {
//            memberHasCapsuleList.get(i).setMember(memberList.get(i));
//            memberHasCapsuleList.get(i).setCapsule(capsule);
//            memberHasCapsuleRepository.save(memberHasCapsuleList.get(i));
//        }

        List<Long> memberIdList = createCapsuleDto.getMemberIdList();

        for (int i = 0; i < memberIdList.size(); i++) {
            MemberHasCapsule target = new MemberHasCapsule();
            System.out.println(">>>>>>>>>> memberIdList " + (i + 1) + "번째 사용자 저장 : " + memberIdList.get(i));
            Member member = memberRepository.findByMemberId(memberIdList.get(i));
            target.setMember(member);
            target.setCapsule(capsule);
            memberHasCapsuleRepository.save(target);
        }
        System.out.println(">>>>>>>>>> 캡슐에 속한 사용자들까지 save 까지 완료");
        return capsule;
    }

    /**
     * 포스트 생성
     * @param createPostDto
     * @return
     */
    public Post createPost(CreatePostDto createPostDto){

        Long memberId = createPostDto.getMemberId();
        Member member = memberRepository.findByMemberId(memberId);

        Long capsuleId = createPostDto.getCapsuleId();
        Optional<Capsule> optionalCapsule = capsuleRepository.findById(capsuleId);
        if (optionalCapsule.isEmpty()) {
            throw new TargetNotFoundException("capsule is null, cannot create post into capsule");
        }
        Capsule capsule = optionalCapsule.get();

        Post post = new Post();

        post.setPostTitle(createPostDto.getPostTitle());
        post.setPostContent(createPostDto.getPostContent());
        post.setDueTime(createPostDto.getDueTime());
        post.setLatitude(createPostDto.getLatitude());
        post.setLongitude(createPostDto.getLongitude());

        post.setCapsule(capsule);
        post.setMember(member);

        if (post.getLatitude() != capsule.getLatitude()
                && post.getLongitude() != capsule.getLongitude()){
           throw new PositionValidateException("해당 장소에서는 게시글을 생성할 수 없습니다");
        }

        postRepository.save(post);
        return post;
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
     * 맴버 전체 조회 (캡슐 조회)
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
