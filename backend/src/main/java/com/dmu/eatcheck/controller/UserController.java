package com.dmu.eatcheck.controller;

//Controller : http(post/get) 요청 처리


import com.dmu.eatcheck.dto.request.LoginRequest;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j  //로그 설정 어노테이션
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<GenericResponse> login(@RequestBody LoginRequest request) {
        log.info("로그인 요청 userId={}", request.getUserId());
        //클라이언트가 보낸 json데이터를 LoginRequest객체로 받아옴.
        // login : 메서드 이름
        //ResponseEntity<LoginResponse> : HTTP 응답 + JSON 데이터 타입을 함께 반환
        boolean success = userService.login(request.getUserId(), request.getPassword());
        if (success) {//ResponseEntity.ok : 상태코드(200) -> 200응답과 함께 json데이터를 함께 return 한다는 뜻
            return ResponseEntity.ok(GenericResponse.success("로그인 성공", null));
        } else { //ResponseEntity.status(HttpStatus.XXX).body() : 401코드(인증실패)를 응답
            //.body()를 통해서 json데이터를 함께 return하게끔 함.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(GenericResponse.error("아이디 또는 비밀번호가 올바르지 않습니다."));
        }
    }
}
