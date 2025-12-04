package com.dmu.eatcheck.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodAvoidanceRequestDto {

    @NotNull
    private Integer userId;

    private List<String> avoidanceFoodNames;
}