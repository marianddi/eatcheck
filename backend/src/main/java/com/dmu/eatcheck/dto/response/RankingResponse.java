package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RankingResponse {
    private List<RankingListItem> rankingList;
    private RankingListItem myRanking;
}
