package com.dmu.eatcheck.dto.response;

import com.dmu.eatcheck.entity.ActivityLevel;
import com.dmu.eatcheck.entity.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class BodyInfoDto {
    private Integer age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private BigDecimal height;
    private BigDecimal weight;
    private ActivityLevel activityLevel;
    private Integer bmr;
}
