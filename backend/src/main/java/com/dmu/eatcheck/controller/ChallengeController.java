package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ChallengeRequest;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.ChallengeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@Slf4j  //로그 설정 어노테이션
@RestController
@RequestMapping("/challenge")
public class ChallengeController {
    private final ChallengeService challengeService;

    @PostMapping("/challengeList")
    public ResponseEntity<GenericResponse> challengeList(@RequestBody ChallengeRequest request){
        log.info("도전과제 리스트 출력 요청 userPk={}", request.getUserPk());
        GenericResponse response = challengeService.getUserChallengeListWrapped(request.getUserPk());

        return ResponseEntity.ok(response);
    }

}
