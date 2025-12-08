package com.dmu.eatcheck.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    @NotBlank
    private String userId;

    @NotBlank(message = "현재 비밀번호는 필수 입니다.")
    private String currentPassword;

    @NotBlank(message = "새 비밀번호는 필수 입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "새 비밀번호는 8자 이상, 영문자와 숫자를 포함해야 합니다.")
    private String newPassword;

    @NotBlank(message = "새 비밀번호 확인은 필수 입니다.")
    private String newPasswordConfirm;
}