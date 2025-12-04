package com.dmu.eatcheck.controller;


import com.dmu.eatcheck.dto.request.SignUpRequestDto;
import com.dmu.eatcheck.dto.response.SignUpResponseDto;
import com.dmu.eatcheck.service.SignUpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping("/signUp")
public class SignUpController {

    private final SignUpService signUpService;

    /**
     POST
     /signUp/register
     회원가입: 새로운 사용자 정보를 받아 회원으로 등록합니다.
     **/
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

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseDto);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409 Conflict
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 회원가입에 실패했습니다.");
        }
    }

    /**
     GET
     ex) /signUp/checkId
     아이디 중복 체크: 특정 userId가 이미 사용 중인지 확인합니다.
     **/
    @GetMapping("/checkId")
    @ResponseBody
    public ResponseEntity<String> checkUserId(@RequestParam String userId) {
        try {
            signUpService.validateDuplicateUser(userId, null, null);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("사용 가능한 아이디입니다.");

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류로 인해 중복 체크에 실패했습니다.");
        }
    }
}