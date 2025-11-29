package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class MyPageResponse {
    private String profileImage;
    private String nickname;
    private BigDecimal weight;
    private List<WeightLogItem> weightLogs;
}
