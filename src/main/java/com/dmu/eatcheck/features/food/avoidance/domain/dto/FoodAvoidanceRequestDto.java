package com.dmu.eatcheck.features.food.avoidance.domain.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodAvoidanceRequestDto {

    @NotNull(message = "사용자 ID는 필수입니다.")
    private Integer userId;

    private List<String> avoidanceFoodNames;
}