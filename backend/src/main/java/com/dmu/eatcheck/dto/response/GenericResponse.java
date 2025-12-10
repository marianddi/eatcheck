package com.dmu.eatcheck.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GenericResponse {

    private String status;   // OK, ERROR
    private String message;  // 메시지
    private Object data;     // payload

    public GenericResponse() {}

    /* ===============================
       SUCCESS METHODS
    =============================== */

    // 기존 성공 방식 유지
    public static GenericResponse success(String message, Object data) {
        return new GenericResponse("OK", message, data);
    }

    // 🔥 추가: data 없이 성공만 보내고 싶을 때
    public static GenericResponse success(String message) {
        return new GenericResponse("OK", message, null);
    }


    /* ===============================
       ERROR METHODS
    =============================== */

    // 기존 에러
    public static GenericResponse error(String message) {
        return new GenericResponse("ERROR", message, null);
    }

    // 🔥 추가: 에러 + 데이터 포함 가능
    public static GenericResponse error(String message, Object data) {
        return new GenericResponse("ERROR", message, data);
    }


    /* ===============================
       UTILITY METHODS
    =============================== */

    // 🔥 상태 체크 메서드
    public boolean isSuccess() {
        return "OK".equalsIgnoreCase(this.status);
    }

    public boolean isError() {
        return "ERROR".equalsIgnoreCase(this.status);
    }
}
