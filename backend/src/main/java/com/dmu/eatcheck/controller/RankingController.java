package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.RankingListItem;
import com.dmu.eatcheck.dto.response.RankingResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.RankingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    private final RankingService rankingService;

    // TOP10 + 내랭킹 함께 반환
    @GetMapping("/top10")
    public ResponseEntity<GenericResponse> getTop10(@RequestParam Integer userId) {
        log.info("랭킹 Top10 요청 userId={}", userId);
        RankingResponse ranking = rankingService.getRanking(userId);

        return ResponseEntity.ok(
                new GenericResponse().success("랭킹 Top10 조회 성공", ranking)
        );
    }

    // 내 랭킹만 반환
    @GetMapping("/me")
    public ResponseEntity<GenericResponse> getMyRank(@RequestParam Integer userId) {
        log.info("내 랭킹 요청 userId={}", userId);
        RankingListItem me = rankingService.getRanking(userId).getMe();

        return ResponseEntity.ok(
                new GenericResponse().success("내 랭킹 조회 성공", me)
        );
    }
}
