package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Getter
@Setter
public class AllergyFoodRequest {
    private Integer userPk;
    private List<String> allergyFoods;
}
