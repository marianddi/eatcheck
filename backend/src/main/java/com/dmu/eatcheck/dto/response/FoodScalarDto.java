package com.dmu.eatcheck.dto.response;

import com.dmu.eatcheck.entity.Food;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FoodScalarDto {
    private final Food food;
    private final double scalarScore;

    public FoodSearchResponseDto toResponseDto() {
        return FoodSearchResponseDto.builder()
                .foodId(food.getFoodId())
                .foodName(food.getFoodName())
                .foodGroup(food.getFoodGroup())
                .enerc(food.getEnerc())
                .build();
    }
}
