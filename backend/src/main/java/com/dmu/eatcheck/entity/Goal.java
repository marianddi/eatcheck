package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private double targetWeight;

    private LocalDate startDate;
    private LocalDate endDate;
}
