package com.dmu.eatcheck.entity;
//Entity : db테이블 매핑
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id //primaryKey
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private String userId;
    private String nickname;
    private String email;
    private String password;
    private Boolean gender;
    @Column(name = "total_score")
    private Integer totalScore;
    @Column(name = "reg_date")
    private Date regDate;
    @Column(name = "modified_date")
    private Date modifiedDate;
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @OneToMany(mappedBy="user") //mappedBy는 외래키를 가진 객체를 가리킴. -> 외래키는 User_challenge.user가 가지고 있음!
    private List<User_challenge> userChallengeList;
}