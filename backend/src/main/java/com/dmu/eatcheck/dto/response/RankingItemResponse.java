package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RankingItemResponse {
    private Integer userId;
    private String nickname;
    private Integer totalScore;
}