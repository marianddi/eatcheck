package com.dmu.eatcheck.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name = "id")
    private Integer profileId; // 엔티티 이름 유지, DB 컬럼명 id 사용

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
}