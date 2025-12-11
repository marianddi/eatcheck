package com.dmu.eatcheck.dto.response;

import com.dmu.eatcheck.entity.Food;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoodSearchResponseDto {

    private Long foodId;
    private String foodName;
    private String foodGroup;
    private String enerc; // 에너지(kcal)
    private String prot;
    private String fatce;
    private String chocdf;

    public static FoodSearchResponseDto fromEntity(Food food) {
        return FoodSearchResponseDto.builder()
                .foodId(food.getFoodId())
                .foodName(food.getFoodName())
                .foodGroup(food.getFoodGroup())
                .enerc(food.getEnerc())
                .prot(food.getProt())
                .fatce(food.getFatce())
                .chocdf(food.getChocdf())
                .build();
    }
}