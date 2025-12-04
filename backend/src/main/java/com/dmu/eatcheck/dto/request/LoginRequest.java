package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;

// 로그인 DTO
@Getter
@Setter
public class LoginRequest {
    private Integer userId;
    private String password;
}