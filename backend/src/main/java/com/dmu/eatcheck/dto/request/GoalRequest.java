package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GoalRequest {
    private Integer userPk;
    private Double goalWeight;
    private Integer days;
}
