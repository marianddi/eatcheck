package com.dmu.eatcheck.features.auth.signUp.controller;

import com.dmu.eatcheck.features.auth.signUp.service.SignUpService;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.SignUpResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/signUp")
public class SignUpController {

    private final SignUpService signUpService;

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestDto requestDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().getFirst().getDefaultMessage();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorMessage);
        }

        try {
            SignUpResponseDto responseDto = signUpService.registerUser(requestDto);

            log.info("회원가입 성공: {}", responseDto.getUserId());
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseDto);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body(e.getMessage());

        } catch (Exception e) {
            log.error("회원가입 중 서버 오류 발생", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 회원가입에 실패했습니다.");
        }
    }
}