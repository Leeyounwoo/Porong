package com.porong.common.controller;

import com.porong.common.domain.Member;
import com.porong.common.domain.capsule.Capsule;
import com.porong.common.domain.capsule.Post;
import com.porong.common.dto.capsule.*;
import com.porong.common.service.CapsuleService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/capsule")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CapsuleController {

    private final CapsuleService capsuleService;

    @PostMapping("/access/capsule")
    @ApiOperation(value = "타임캡슐 조회 자격(시간 조건, 장소 조건, 소속된 사용자) 판단하기")
    public ResponseEntity<String> accessCapsule(@RequestBody RequestAccessDto requestAccessDto){
        String result = capsuleService.accessCapsule(requestAccessDto);
        if (result.equals("fail time")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail time");
        }
        if (result.equals("fail member")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail member");
        }
        if (result.equals("fail position")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail position");
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @PostMapping("/create/capsule")
    @ApiOperation(value = "타임캡술 (방) 만들기")
    public ResponseEntity<String> createCapsule(@RequestBody CreateCapsuleDto createCapsuleDto){
        Capsule capsule = capsuleService.createCapsule(createCapsuleDto);
        if (capsule == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @PostMapping("/create/post")
    @ApiOperation(value = "해당 타임캡슐 장소에서 게시글 작성하기")
    public ResponseEntity<String> createPost(@RequestBody CreatePostDto createPostDto){
        String result = capsuleService.createPost(createPostDto);
        if (result.equals("fail member")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail member");
        }
        if (result.equals("fail position")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail position");
        }
        return ResponseEntity.status(HttpStatus.OK).body("success");
    }

    @GetMapping("/getone/post/{postId}")
    @ApiOperation(value = "해당 게시글 단건 조회하기")
    public ResponseEntity<ResponsePostDto> getPost(@PathVariable Long postId){
        ResponsePostDto responsePostDto = new ResponsePostDto();
        Post post = capsuleService.getPost(postId);
        if (post == null){
            responsePostDto.setResult("fail");
            responsePostDto.setPost(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsePostDto);
        }
        responsePostDto.setResult("success");
        responsePostDto.setPost(post);
        return ResponseEntity.status(HttpStatus.OK).body(responsePostDto);
    }

    @GetMapping("/getone/capsule/{capsuleId}")
    @ApiOperation(value = "해당 타임캡슐 단건 조회하기")
    public ResponseEntity<ResponseCapsuleDto> getCapsule(@PathVariable Long capsuleId){
        ResponseCapsuleDto responseCapsuleDto = new ResponseCapsuleDto();
        Capsule capsule = capsuleService.getCapsule(capsuleId);
        if (capsule == null){
            responseCapsuleDto.setResult("fail");
            responseCapsuleDto.setCapsule(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseCapsuleDto);
        }
        responseCapsuleDto.setResult("success");
        responseCapsuleDto.setCapsule(capsule);
        return ResponseEntity.status(HttpStatus.OK).body(responseCapsuleDto);
    }

    @GetMapping("/getlist/postlist/{capsuleId}")
    @ApiOperation(value = "해당 타임캡슐 게시글 리스트 조회하기")
    public ResponseEntity<ResponsePostListDto> getPostList(@PathVariable Long capsuleId){
        ResponsePostListDto responsePostListDto = new ResponsePostListDto();
        List<Post> postList = capsuleService.getPostList(capsuleId);
        if (postList == null){
            responsePostListDto.setResult("fail");
            responsePostListDto.setPostList(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsePostListDto);
        }
        responsePostListDto.setResult("success");
        responsePostListDto.setPostList(postList);
        return ResponseEntity.status(HttpStatus.OK).body(responsePostListDto);
    }

    @GetMapping("/getlist/capsulelist/{memberId}")
    @ApiOperation(value = "사용자가 속해있는 타임캡슐 리스트 조회하기")
    public ResponseEntity<ResponseCapsuleListDto> getCapsuleList(@PathVariable Long memberId){
        ResponseCapsuleListDto responseCapsuleListDto = new ResponseCapsuleListDto();
        List<Capsule> capsuleList = capsuleService.getCapsuleList(memberId);
        if (capsuleList == null){
            responseCapsuleListDto.setResult("fail");
            responseCapsuleListDto.setCapsuleList(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseCapsuleListDto);
        }
        responseCapsuleListDto.setResult("success");
        responseCapsuleListDto.setCapsuleList(capsuleList);
        return ResponseEntity.status(HttpStatus.OK).body(responseCapsuleListDto);
    }

    @GetMapping("/getlist/memberlist/{capsuleId}")
    @ApiOperation(value = "해당 타임캡슐에 속해있는 사용자 전체 조회하기")
    public ResponseEntity<ResponseMemberListDto> getMemberList(@PathVariable Long capsuleId){
        ResponseMemberListDto responseMemberListDto = new ResponseMemberListDto();
        List<Member> memberList = capsuleService.getCapsuleMemberList(capsuleId);
        if (memberList == null){
            responseMemberListDto.setResult("fail");
            responseMemberListDto.setMemberList(null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMemberListDto);
        }
        responseMemberListDto.setResult("success");
        responseMemberListDto.setMemberList(memberList);
        return ResponseEntity.status(HttpStatus.OK).body(responseMemberListDto);
    }
}
