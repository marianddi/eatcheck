package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ChallengeRequest;
import com.dmu.eatcheck.dto.request.MyPageRequest;
import com.dmu.eatcheck.dto.request.PasswordRequest;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.MyPageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j  //로그 설정 어노테이션
@RestController
@RequestMapping("/mypage")
public class MyPageController {
    private final MyPageService myPageService;


    //마이페이지 정보 조회 api
    @GetMapping("/userInfo/{userPk}")
    public ResponseEntity<GenericResponse> userInfo(@PathVariable Integer userPk){
        log.info("마이페이지 정보 조회 요청 userPk={}", userPk);
        GenericResponse response = myPageService.getUserInfo(userPk);

        return ResponseEntity.ok(response);
    }

    //비밀번호 변경 api
    @PostMapping("/changePw")
    public ResponseEntity<GenericResponse> changePassword(@RequestBody PasswordRequest request){
        log.info("비밀번호 변경 요청 userPk={}", request.getUserPk());
        GenericResponse response = myPageService.changePassword(request.getUserPk(), request.getPassword(), request.getNewPassword(), request.getNewPasswordCheck());

        return ResponseEntity.ok(response);
    }

}
