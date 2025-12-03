package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.request.ProfileRequestDto;
import com.dmu.eatcheck.dto.response.ProfileResponseDto;
import com.dmu.eatcheck.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    /**
     POST
     ex) /profile/set
     프로필 설정/업데이트: 사용자 ID를 기준으로 프로필 정보(키, 몸무게 등)를 생성하거나 업데이트합니다.
     **/

    @PostMapping("/set")
    public ResponseEntity<?> setProfile(@Valid @RequestBody ProfileRequestDto requestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorMessage);
        }

        try {
            ProfileResponseDto responseDto = profileService.createOrUpdateProfile(requestDto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 프로필 기입에 실패했습니다.");
        }
    }
}