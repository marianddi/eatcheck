package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCompleteRequest {
    private Integer userId;
    private Integer challengeId;
}
