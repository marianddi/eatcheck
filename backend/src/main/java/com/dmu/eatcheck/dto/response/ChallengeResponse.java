package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ChallengeResponse {
    private List<ChallengeListItem> challegeList;
    private Integer userScore;
}
