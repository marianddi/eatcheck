package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class  ChallengeRecommendResponse {
    private Long challengeId;
    private String name;
    private int score;
    private String type;
    private String userGoalType;   // DIET / BULK / MAINTAIN
}