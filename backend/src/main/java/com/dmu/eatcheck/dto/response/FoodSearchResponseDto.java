package com.dmu.eatcheck.dto.response;

import com.dmu.eatcheck.entity.Food;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoodSearchResponseDto {

    private String foodName;
    private String foodGroup;
    private String enerc; // 에너지(kcal)

    public static FoodSearchResponseDto fromEntity(Food food) {
        return FoodSearchResponseDto.builder()
                .foodName(food.getFoodName())
                .foodGroup(food.getFoodGroup())
                .enerc(food.getEnerc())
                .build();
    }
}