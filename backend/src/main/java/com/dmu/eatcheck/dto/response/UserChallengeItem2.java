package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserChallengeItem2 {
    private Integer challengeId;
    private String title;
    private Integer score;
    private Integer progress;
    private Integer goal;
    private Boolean isCompleted;
}
