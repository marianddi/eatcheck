package com.dmu.eatcheck.features.auth.signUp.domain.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProfileRequestDto {

    @NotNull(message = "사용자 ID는 필수입니다.")
    private Integer userId;

    @NotNull(message = "키는 필수 입력 값입니다.")
    @DecimalMin(value = "50.0", message = "키는 50cm 이상이어야 합니다.")
    private BigDecimal height;

    @NotNull(message = "나이는 필수 입력 값입니다.")
    @Min(value = 1, message = "나이는 1세 이상이어야 합니다.")
    private Integer age;

    @NotNull(message = "몸무게는 필수 입력 값입니다.")
    @DecimalMin(value = "10.0", message = "몸무게는 10kg 이상이어야 합니다.")
    private BigDecimal weight;
}