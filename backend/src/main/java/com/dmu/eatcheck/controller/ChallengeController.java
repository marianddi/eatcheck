package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ChallengeRequest;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.ChallengeService;
import com.dmu.eatcheck.service.RankingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j  //로그 설정 어노테이션
@RestController
@RequestMapping("/challenge")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final RankingService rankingService;

    @PostMapping("/challengeList")
    public ResponseEntity<GenericResponse> challengeList(@RequestBody ChallengeRequest request){
        log.info("도전과제 리스트 출력 요청 userPk={}", request.getUserPk());
        GenericResponse response = challengeService.getUserChallengeListWrapped(request.getUserPk());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/ranking/{userPk}")
    public ResponseEntity<GenericResponse> userInfo(@PathVariable Integer userPk){
        log.info("랭킹 리스트 조회 요청 userPk={}", userPk);
        GenericResponse response = new GenericResponse().success("랭킹 리스트 조회 성공", rankingService.getRanking(userPk));

        return ResponseEntity.ok(response);
    }


}
