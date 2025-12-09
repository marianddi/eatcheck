package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.FoodApiItemDto;
import com.dmu.eatcheck.dto.response.FoodDataWrapperDto;
import com.dmu.eatcheck.entity.Food;
import com.dmu.eatcheck.repository.FoodRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodDataLoaderService {

    private final FoodRepository foodRepository;
    private final ObjectMapper objectMapper;

    @Value("classpath:전국통합식품영양성분정보_음식_표준데이터.json")
    private Resource foodDataResource;

    private String getStringOrZero(String value) {
        if (value == null || value.trim().isEmpty() || "null".equalsIgnoreCase(value.trim())) {
            return "0";
        }
        return value.trim();
    }

    @PostConstruct
    @Transactional
    public void loadFoodData() {
        if (foodRepository.count() > 0) {
            log.info("이미 DB에 식품 데이터가 존재합니다. Bulk Loading을 건너뜁니다.");
            return;
        }

        log.info("===[식품 데이터 Bulk Loading 시작]=== ");

        try (InputStream inputStream = foodDataResource.getInputStream()) {

            // 1. JSON 파일을 FoodDataWrapperDto 객체로 변환 (최상위 객체 파싱)
            FoodDataWrapperDto wrapper = objectMapper.readValue(inputStream, FoodDataWrapperDto.class);

            // 2. Wrapper 객체에서 records 필드의 식품 리스트 추출
            List<FoodApiItemDto> items = wrapper.getRecords();

            if (items == null || items.isEmpty()) {
                log.warn("JSON 파일에서 데이터를 찾았으나 식품 리스트(records)가 비어있습니다. 파싱 경로 확인 필요.");
                return;
            }

            log.info("JSON 파일에서 총 {}개의 식품 데이터를 읽었습니다.", items.size());

            List<Food> foodEntities = items.stream()
                    .map(item -> {
                        String fullJson = "";
                        try {
                            // 전체 JSON 정보를 문자열로 저장
                            fullJson = objectMapper.writeValueAsString(item);
                        } catch (IOException e) {
                            log.warn("JSON 직렬화 오류: {}", e.getMessage());
                        }

                        return Food.builder()
                                .foodName(getStringOrZero(item.getFoodName()))
                                .apiFoodId(getStringOrZero(item.getApiFoodId()))
                                .foodGroup(getStringOrZero(item.getFoodGroup()))
                                .nutritionalInfo(fullJson) // 전체 JSON 저장
                                .enerc(getStringOrZero(item.getEnerc()))
                                .prot(getStringOrZero(item.getProt()))
                                .fatce(getStringOrZero(item.getFatce()))
                                .chocdf(getStringOrZero(item.getChocdf()))
                                .lastUpdated(LocalDateTime.now())
                                .build();
                    })
                    .collect(Collectors.toList());

            // 3. DB에 대량 저장
            foodRepository.saveAll(foodEntities);
            log.info("===[식품 데이터 Bulk Loading 완료: {}개 저장]=== ", foodEntities.size());

        } catch (IOException e) {
            log.error("식품 데이터 파일을 읽거나 파싱하는 중 오류 발생: {}", e.getMessage(), e);
        }
    }
}