package com.dmu.eatcheck.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String user_id;
    private String nickname;
    private String email;
    private String password;
    private Boolean gender;
    private Integer total_score;
    private Date reg_date;
    private Date modified_date;
    private Boolean is_deleted;
}