package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.RankingItemResponse;
import com.dmu.eatcheck.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/top10")
    public ResponseEntity<List<RankingItemResponse>> getTop10Ranking() {
        List<RankingItemResponse> top10 = rankingService.getTop10Ranking();
        return ResponseEntity.ok(top10);
    }
}
