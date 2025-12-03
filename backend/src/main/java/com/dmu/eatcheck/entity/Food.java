package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(name = "enerc")
    private String enerc; // 에너지(kcal)

    @Column(name = "prot")
    private String prot; // 단백질(g)

    @Column(name = "fatce")
    private String fatce; // 지방(g)

    @Column(name = "chocdf")
    private String chocdf; // 탄수화물(g)

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}