package com.dmu.eatcheck.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_profile")
public class User_profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private BigDecimal height;
    private Integer age;
    private BigDecimal weight;
    private Integer bmr;
    @Column(name = "record_date")
    private Date recordDate;
    @Column(name= " profile_image")
    private String profileImage;
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<Weight_log> weightLogs = new ArrayList<>();

}
