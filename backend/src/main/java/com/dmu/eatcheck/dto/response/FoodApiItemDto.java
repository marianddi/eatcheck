package com.dmu.eatcheck.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodApiItemDto {

    @JsonProperty("식품코드")
    private String apiFoodId;

    @JsonProperty("식품명")
    private String foodName;

    @JsonProperty("식품중분류명")
    private String foodGroup;

    @JsonProperty("데이터기준일자")
    private String crtrYmd;

    @JsonProperty("에너지(kcal)")
    private String enerc;

    @JsonProperty("단백질(g)")
    private String prot;

    @JsonProperty("지방(g)")
    private String fatce;

    @JsonProperty("탄수화물(g)")
    private String chocdf;

    private String fullNutritionalJson;
}