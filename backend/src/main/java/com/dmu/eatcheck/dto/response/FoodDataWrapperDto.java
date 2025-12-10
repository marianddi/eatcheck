package com.dmu.eatcheck.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodDataWrapperDto {

    @JsonProperty("records")
    private List<FoodApiItemDto> records;

    @JsonProperty("fields")
    private List<Object> fields;
}