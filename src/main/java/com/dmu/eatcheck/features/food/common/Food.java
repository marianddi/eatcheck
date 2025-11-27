package com.dmu.eatcheck.features.food.common;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "Food_List")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Long foodId;

    @Column(name = "api_food_id", unique = true)
    private String apiFoodId;

    @Column(name = "food_group")
    private String foodGroup;

    @Column(name = "food_name", nullable = false)
    private String foodName;

    @Column(name = "nutritional_info", columnDefinition = "JSON")
    private String nutritionalInfo;
}