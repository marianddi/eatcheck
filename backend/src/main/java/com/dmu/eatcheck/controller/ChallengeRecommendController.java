package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.ChallengeRecommendResponse;
import com.dmu.eatcheck.service.ChallengeRecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeRecommendController {

    private final ChallengeRecommendService challengeRecommendService;

    @GetMapping("/recommend")
    public ChallengeRecommendResponse recommend(
            @RequestParam(required = false) Long userId
    ) {
        return challengeRecommendService.recommend(userId);
    }
}
