package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "challenge_master")
public class Challenge_master {
    @Id //primaryKey
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String challenge_text;
    private Integer target;
    private Integer compensation;
}
