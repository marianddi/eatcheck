package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/food")
public class FoodController {

    private final FoodRepository foodRepository;

    // 음식 검색 API
    @GetMapping("/search")
    public List<Food> searchFood(@RequestParam String query) {
        return foodRepository
                .findByFoodNameContaining(query);
    }
}
