package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ChallengeRequest;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.ChallengeService;
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

    private final ChallengeService challengeService;
    private final RankingService rankingService;

    /**
     * POST 방식: 기존 앱에서 사용 중일 가능성이 있으므로 유지
     */

    /**
     * GET 방식: 프론트에서 GET 호출하도록 바뀐 경우 지원용
     */
    @GetMapping("/challengeList")
    public ResponseEntity<GenericResponse> challengeList(@RequestParam Integer userId) {
        log.info("도전과제 리스트 출력 요청(GET) userId={}", userId);
        GenericResponse response = challengeService.getUserChallengeListWrapped(userId);
        return ResponseEntity.ok(response);
    }
    /**
     * 랭킹 기능 — 기존 로직 그대로 유지 (절대 수정하면 안 됨)
     */
    @GetMapping("/ranking/{userPk}")
    public ResponseEntity<GenericResponse> userInfo(@PathVariable Integer userPk) {
        log.info("랭킹 리스트 조회 요청 userPk={}", userPk);
        GenericResponse response =
                GenericResponse.success("랭킹 리스트 조회 성공", rankingService.getRanking(userPk));
        return ResponseEntity.ok(response);
    }
}
