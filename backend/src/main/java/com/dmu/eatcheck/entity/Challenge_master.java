package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "challenge_master")
public class Challenge_master {
    @Id //primaryKey
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "challenge_text")
    private String challengeText;
    private Integer target;
    private Integer compensation;


    @OneToMany(mappedBy="challengeMaster")
    private List<User_challenge> userChallengeList;
}
