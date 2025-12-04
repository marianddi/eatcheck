package com.dmu.eatcheck.service;

import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.dto.response.FoodApiItemDto;
import java.util.List;
import java.util.Optional;

public interface FoodService {

    Food getOrCreateFood(String foodName);

    List<Food> searchFoodsByName(String searchTerm);
    //    Food saveFoodFromApi(FoodApiItemDto foodData);
}
