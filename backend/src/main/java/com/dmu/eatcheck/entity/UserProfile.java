package com.dmu.eatcheck.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "User_Profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal height;

    private Integer age;

    private BigDecimal weight;

    private Integer bmr;

    @Enumerated(EnumType.STRING)
    private ActivityLevel activityLevel;

    private Integer tdee;
    private Integer recommendedCalorie;
    private Integer recommendedCarb;
    private Integer recommendedProtein;
    private Integer recommendedFat;

    @Column(name = "record_date")
    private LocalDateTime recordDate;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<Weight_log> weightLogs = new ArrayList<>();

    //알레르기
    @ElementCollection(targetClass = AllergyFood.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "user_allergy_food",
            joinColumns = @JoinColumn(name = "user_profile_id")
    )
    @Column(name = "allergy_food")
    private Set<AllergyFood> allergyFoods = new HashSet<>();
}