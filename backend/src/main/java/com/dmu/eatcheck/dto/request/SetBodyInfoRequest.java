package com.dmu.eatcheck.dto.request;

import com.dmu.eatcheck.entity.ActivityLevel;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class SetBodyInfoRequest {//(키, 몸무게, 주당 운동시간, 기초대사량만)
    private Integer userPk;
    private BigDecimal height;
    private BigDecimal weight;
    private Integer bmr;
    private String activityLevelStr;
}