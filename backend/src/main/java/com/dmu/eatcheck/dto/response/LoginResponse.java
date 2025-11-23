package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginResponse{
    private String status; //ok, error 등
    private String message;
    private Object data; //확장성 : token, userInfo 등 담을 수 잇게 objcet로 data 객체를 만듦.

    public LoginResponse(){
    }

    //성공, 에러 메소드
    public static LoginResponse success(String message, Object data) {
        return new LoginResponse("OK", message, data);
    }

    public static LoginResponse error(String message) {
        return new LoginResponse("ERROR", message, null);
    }
}