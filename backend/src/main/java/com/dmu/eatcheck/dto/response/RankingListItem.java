package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RankingListItem {
    private Integer rank;
    private String profileImage;
    private String nickname;
    private Integer score;
}
