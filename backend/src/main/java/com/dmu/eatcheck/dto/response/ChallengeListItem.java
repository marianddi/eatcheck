package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChallengeListItem {
    private Integer userId;
    private Integer challengeId;
    private String challengeText;
    private Integer target;
    private Integer progress;
    private Integer compensation;
    private Boolean completed;      // completed
}
