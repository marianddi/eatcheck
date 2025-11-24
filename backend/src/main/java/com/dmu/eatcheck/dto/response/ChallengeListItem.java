package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChallengeListItem {
    private Integer userId;          // user_id
    private Integer challengeId;     // challenge_id
    private String challengeText;    // challenge_text
    private Integer target;          // target
    private Integer progress;        // progress
    private Integer compensation;    // compensation
    private Boolean completed;       // completed
}
