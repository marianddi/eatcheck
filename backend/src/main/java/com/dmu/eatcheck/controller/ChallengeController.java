package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ChallengeCompleteRequest;
import com.dmu.eatcheck.dto.request.ChallengeRequest;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.ChallengeService;
import com.dmu.eatcheck.service.ChallengeService2;
import com.dmu.eatcheck.service.RankingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;   // 기존 도전과제
    private final ChallengeService2 challengeService2; // 신규 랜덤+완료 기능
    private final RankingService rankingService;


    /**
     * 기존 사용자 도전과제 리스트 API
     * ChallengeService 사용
     */
    @PostMapping("/challengeList")
    public ResponseEntity<GenericResponse> challengeList(@RequestBody ChallengeRequest request) {
        log.info("도전과제 리스트 출력 요청 userPk={}", request.getUserPk());
        GenericResponse response = challengeService.getUserChallengeListWrapped(request.getUserPk());
        return ResponseEntity.ok(response);
    }


    /**
     * 랭킹 조회
     */
    @GetMapping("/ranking/{userPk}")
    public ResponseEntity<GenericResponse> userInfo(@PathVariable Integer userPk) {
        log.info("랭킹 리스트 조회 요청 userPk={}", userPk);
        GenericResponse response =
                GenericResponse.success("랭킹 리스트 조회 성공", rankingService.getRanking(userPk));
        return ResponseEntity.ok(response);
    }


    /**
     * 🔥 신규 도전과제 완료 API (ChallengeService2 사용)
     */
    @PostMapping("/complete")
    public ResponseEntity<?> completeChallenge(@RequestBody ChallengeCompleteRequest req) {
        log.info("도전과제 완료 요청 userId={}, challengeId={}", req.getUserId(), req.getChallengeId());
        return ResponseEntity.ok(
                GenericResponse.success("도전과제 완료!", challengeService2.completeChallenge(req))
        );
    }
}
