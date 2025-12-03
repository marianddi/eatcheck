package com.dmu.eatcheck.entity;
//Entity : db테이블 매핑

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Builder
@Entity
@AllArgsConstructor
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
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;
    @Column(name = "total_score")
    private Integer totalScore;
    @Column(name = "reg_date")
    private LocalDate regDate;
    @Column(name = "modified_date")
    private LocalDate modifiedDate;
    @Builder.Default
    @Column(name = "is_deleted", columnDefinition = "BOOLEAN default FALSE")
    private Boolean isDeleted = false;

    @OneToMany(mappedBy="user") //mappedBy는 외래키를 가진 객체를 가리킴. -> 외래키는 User_challenge.user가 가지고 있음!
    private List<User_challenge> userChallengeList;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile userProfile;
}