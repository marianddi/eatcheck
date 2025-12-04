package com.dmu.eatcheck.dto.request;

import com.dmu.eatcheck.entity.MealType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Getter
@Setter
public class DietLogRequestDto {

    @NotNull
    private Integer userId;

    @NotNull
    private LocalDate recordDate;

    @NotNull
    private MealType mealType;

    @NotBlank(message = "음식 이름은 필수입니다.")
    private String foodName;

    @NotNull
    @DecimalMin(value = "0.01", message = "섭취량은 0보다 커야 합니다.")
    private Double servingSize;

    private Double calories;
}