//package com.porong.common.controller;
//
//import com.porong.common.domain.capsule.Post;
//import com.porong.common.dto.capsule.CreateCapsuleDto;
//import com.porong.common.dto.capsule.CreateMessageDto;
//import com.porong.common.dto.capsule.RequestPositionDto;
//import com.porong.common.service.CapsuleService;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping("v1/capsule")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*", allowedHeaders = "*")
//public class CapsuleController {
//
//    private final CapsuleService capsuleService;
//
//    @PostMapping("/create/capsule")
//    @ApiOperation(value = "타임캡술 (방) 만들기")
//    public ResponseEntity<String> createCapsule(@RequestBody CreateCapsuleDto createCapsuleDto){
//        return ResponseEntity.status(HttpStatus.OK).body("success");
//    }
//
//    @PostMapping("/create/post")
//    @ApiOperation(value = "해당 타임캡슐 장소에서 게시글 작성하기")
//    public ResponseEntity<String> createPost(@RequestBody CreateMessageDto createMessageDto){
//        return ResponseEntity.status(HttpStatus.OK).body("success");
//    }
//
//    @GetMapping("/calc/position")
//    @ApiOperation(value = "타임캡슐 조회 위치 자격 판단하기")
//    public ResponseEntity<String> calcPosition(@RequestBody RequestPositionDto requestPositionDto){
//        return ResponseEntity.status(HttpStatus.OK).body("success");
//    }
//
//    @GetMapping("/get/capsule/{capsuleId}")
//    @ApiOperation(value = "타임캡슐 게시글 조회하기")
//    public ResponseEntity<List<Post>> getCapsule(@PathVariable Long capsuleId){
//        List<Post> postList = new ArrayList<>();
//        return ResponseEntity.status(HttpStatus.OK).body(postList);
//    }
//}
