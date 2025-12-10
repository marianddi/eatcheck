package com.dmu.eatcheck.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "Diet_Log")
public class DietLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate recordDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MealType mealType;

    @Column(nullable = false, length = 100)
    private String foodName;

    @Column(nullable = false)
    private Double servingSize;

    @Column(nullable = false)
    private Integer calories;

    @Column(nullable = false)
    private Integer carb;

    @Column(nullable = false)
    private Integer protein;

    @Column(nullable = false)
    private Integer fat;
}