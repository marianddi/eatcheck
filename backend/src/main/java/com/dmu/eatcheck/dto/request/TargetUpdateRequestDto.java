package com.dmu.eatcheck.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TargetUpdateRequestDto {

    @NotNull(message = "사용자 ID는 필수 입력 값입니다.")
    private Integer userId;

    @NotNull(message = "목표 체중은 필수 입력 값입니다.")
    @DecimalMin(value = "1.0", message = "목표 체중은 1kg 이상이어야 합니다.")
    private BigDecimal targetWeight;

    @NotNull(message = "달성 기간은 필수 입력 값입니다.")
    @Min(value = 0, message = "달성 기간은 0일 이상이어야 합니다.")
    private Integer targetDurationDays;
}
