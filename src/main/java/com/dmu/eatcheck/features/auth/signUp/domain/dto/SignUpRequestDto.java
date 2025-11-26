package com.dmu.eatcheck.features.auth.signUp.domain.dto;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {

    @NotBlank(message = "아이디는 필수 입력 값입니다.")
    @Size(min = 4, max = 50, message = "아이디는 4~50자여야 합니다.")
    private String userId;

    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    @Size(min = 2, max = 50, message = "닉네임은 2~50자여야 합니다.")
    private String nickname;

    @Email(message = "유효한 이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "비밀번호는 8자 이상, 영문자와 숫자를 포함해야 합니다.")
    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;

}