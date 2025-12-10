package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.ChallengeResponse2;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.ChallengeService2;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/challenge2")
public class ChallengeController2 {

    private final ChallengeService2 challengeService2;

    @GetMapping("/recommend")
    public ResponseEntity<GenericResponse> recommend(@RequestParam Integer userId) {

        log.info("챌린지 추천 API 호출 userId={}", userId);

        ChallengeResponse2 response = challengeService2.getUserChallenges(userId);

        return ResponseEntity.ok(
                new GenericResponse().success("챌린지 반환 성공", response)
        );
    }
}
