package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ChallengeList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    private String name;
    private int score;

    @Column(columnDefinition = "ENUM('DIET','MAINTAIN','BULK','LIFESTYLE','EXERCISE')")
    private String type;
}
