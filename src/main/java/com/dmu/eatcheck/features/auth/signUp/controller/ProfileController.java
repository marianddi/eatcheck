package com.dmu.eatcheck.features.auth.signUp.controller;


import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileRequestDto;
import com.dmu.eatcheck.features.auth.signUp.domain.dto.ProfileResponseDto;
import com.dmu.eatcheck.features.auth.signUp.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

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
            log.error("프로필 기입 중 서버 오류 발생", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 프로필 기입에 실패했습니다.");
        }
    }
}