package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChallengeResponse2 {
    private Integer totalScore;
    private List<UserChallengeItem2> challenges;
}
