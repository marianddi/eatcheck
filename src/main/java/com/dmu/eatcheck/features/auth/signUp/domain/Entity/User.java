package com.dmu.eatcheck.features.auth.signUp.domain.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", unique = true, nullable = false, length = 50)
    private String userId;

    @Column(unique = true, nullable = false, length = 50)
    private String nickname;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    private Boolean gender;

    @Column(name = "total_score", columnDefinition = "INT default 0")
    private Integer totalScore = 0;

    @Column(name = "reg_date", nullable = false)
    private LocalDate regDate;

    @Column(name = "modified_date")
    private LocalDate modifiedDate;

    @Column(name = "is_deleted", columnDefinition = "BOOLEAN default FALSE")
    private Boolean isDeleted = false;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile userProfile;
}