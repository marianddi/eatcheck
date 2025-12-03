package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double height;
    private double weight;

    @Column(columnDefinition = "DECIMAL(5,2)")
    private double bmi;

    private LocalDateTime recordDate;
}
