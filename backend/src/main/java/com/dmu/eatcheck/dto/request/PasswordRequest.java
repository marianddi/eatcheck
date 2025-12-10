package com.dmu.eatcheck.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordRequest {
    private Integer userPk;
    private String password;
    private String newPassword;
    private String newPasswordCheck;
}
