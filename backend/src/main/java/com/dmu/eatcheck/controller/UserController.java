package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.LoginRequest;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<GenericResponse> login(@RequestBody LoginRequest request) {

        try {
            log.info("로그인 요청: userId={}", request.getUserId());

            boolean success = userService.login(request.getUserId(), request.getPassword());

            if (success) {
                return ResponseEntity.ok(
                        GenericResponse.success("로그인 성공", null)
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(GenericResponse.error("아이디 또는 비밀번호가 올바르지 않습니다."));
            }

        } catch (Exception e) {
            log.error("로그인 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(GenericResponse.error("서버 오류가 발생했습니다."));
        }
    }

}
