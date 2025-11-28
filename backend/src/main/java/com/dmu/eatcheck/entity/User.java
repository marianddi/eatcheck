package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")      // PK = user_id
    private Integer userId;

    private String nickname;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;        // ENUM('M','F','OTHER')

    @Column(name = "total_score")
    private Integer totalScore;

    @Column(name = "create_date")
    private java.sql.Date createDate;

    @Column(name = "modified_date")
    private java.sql.Date modifiedDate;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

}
