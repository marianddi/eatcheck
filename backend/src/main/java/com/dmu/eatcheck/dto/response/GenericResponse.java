package com.dmu.eatcheck.dto.response;

//공통 wrapper
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GenericResponse {
    private String status; //ok, error 등
    private String message;
    private Object data; //확장성 : token, userInfo 등 담을 수 잇게 objcet로 data 객체를 만듦.

    public GenericResponse(){
    }

    //성공, 에러 메소드
    public static GenericResponse success(String message, Object data) {
        return new GenericResponse("OK", message, data);
    }

    public static GenericResponse error(String message) {
        return new GenericResponse("ERROR", message, null);
    }
}
