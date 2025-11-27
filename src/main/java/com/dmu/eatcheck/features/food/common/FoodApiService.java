package com.dmu.eatcheck.features.food.common;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class FoodApiService {

    private static final String API_KEY = "72e4345abaab3ead163f476d803ddf18e979bc76682ed203112cf43d54bcc0ce"; //
    private static final String BASE_URL = "https://api.data.go.kr/openapi/tn_pubr_public_nutri_food_info_api"; //
    private final RestTemplate restTemplate;

    public FoodApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchFood(String foodName) {

        // 1. 요청 URL 구성 (필수 파라미터는 명세를 참고하여 추가해야 함)
        String url = UriComponentsBuilder.fromUriString(BASE_URL)
                .queryParam("ServiceKey", API_KEY) // 서비스 키
                .queryParam("type", "json")        // JSON 응답 요청
                .queryParam("foodName", foodName)    // 검색어
                .queryParam("pageNo", 1)           // (예시) 첫 페이지
                .queryParam("numOfRows", 1)        // (예시) 1개만 검색
                .encode()
                .toUriString();

        try {
            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            throw new RuntimeException("식품 API 호출 중 오류 발생: " + e.getMessage());
        }
    }
}