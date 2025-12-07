package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.ChallengeListItem;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.entity.User_challenge;
import com.dmu.eatcheck.repository.ChallengeRepository;
import com.dmu.eatcheck.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    /**
     * 유저가 보유한 도전과제 목록 조회
     */
    @GetMapping("/list")
    public GenericResponse getUserChallengeList(@RequestParam Integer userId) {

        // 1) 유저-challenge 목록 가져오기
        List<User_challenge> userChallengeList =
                challengeRepository.findByUser_UserId(userId);

        // 2) DTO 변환 (필요한 필드만 추출)
        List<ChallengeListItem> challengeItems = userChallengeList.stream()
                .map(uc -> new ChallengeListItem(
                        uc.getUser().getUserId(),
                        uc.getChallengeMaster().getId(),
                        uc.getChallengeMaster().getChallengeText(),
                        uc.getChallengeMaster().getTarget(),
                        uc.getProgress(),
                        uc.getChallengeMaster().getCompensation(),
                        uc.getCompleted()
                ))
                .collect(Collectors.toList());

        // 3) 유저 현재 보유 점수 조회
        Integer userScore = userRepository.findUserScoreById(userId)
                .orElse(0);

        // 4) ChallengeResponse 생성
        ChallengeResponse response = new ChallengeResponse(challengeItems, userScore);

        // 5) GenericResponse 래핑 후 반환
        return GenericResponse.success("도전과제 조회 성공", response);
    }
}
