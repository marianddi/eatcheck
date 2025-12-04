package com.dmu.eatcheck.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FoodDataWrapperDto {

    // JSON의 "records" 필드에 실제 식품 데이터 리스트가 담겨 있습니다.
    @JsonProperty("records")
    private List<FoodApiItemDto> records;

    // "fields" 필드는 데이터 로드 자체에는 필수적이지 않지만, 파싱의 정확성을 위해 포함할 수 있습니다.
    @JsonProperty("fields")
    private List<Object> fields; // 혹은 필드명을 담는 전용 DTO를 사용할 수 있습니다.
}