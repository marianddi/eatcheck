package com.dmu.eatcheck.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_challenge")
public class User_challenge {
    @Id //primaryKey
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer progress;
    private Boolean completed;
    @Column(name = "completed_date")
    private Date completedDate;


    @ManyToOne
    @JsonIgnore //해당 어노테이션은 : 양방향 관계일 때 사용 -> (반대편에 컬렉션이 있을 때)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "challenge_id")
    private Challenge_master challengeMaster;

}
