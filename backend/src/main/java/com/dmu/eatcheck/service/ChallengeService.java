package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.ChallengeListItem;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.entity.Challenge_master;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.entity.User_challenge;
import com.dmu.eatcheck.repository.ChallengeMasterRepository;
import com.dmu.eatcheck.repository.ChallengeRepository;
import com.dmu.eatcheck.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeMasterRepository challengeMasterRepository;
    private final UserRepository userRepository;

    /**
     * 항상 총 4개의 도전과제를 유지하여 반환하는 메서드
     */
    public ChallengeResponse getUserChallengeList(Integer userPk) {

        // 1) 유저 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        // 2) 현재 진행 중인 도전과제 조회 (completed = false)
        List<User_challenge> currentActive = challengeRepository.findByUserIdAndCompletedFalse(userPk);
        int currentCount = currentActive.size();

        // 3) 부족한 개수 계산
        int needCount = 4 - currentCount;

        List<Challenge_master> newChallenges = new ArrayList<>();

        // 4) 부족하면 랜덤으로 새로운 도전과제 지급
        if (needCount > 0) {
            newChallenges = challengeMasterRepository.findRandomNewChallenges(userPk, needCount);
            System.out.println("🎯 needCount = " + needCount);
            System.out.println("🎯 newChallenges.size = " + newChallenges.size());

            for (Challenge_master cm : newChallenges) {
                System.out.println("👉 추가되는 챌린지 ID = " + cm.getId());
            }

            for (Challenge_master cm : newChallenges) {
                User_challenge newUC = new User_challenge();
                newUC.setUserId(userPk);
                newUC.setChallengeId(cm.getId());
                newUC.setProgress(0);
                newUC.setCompleted(false);

                challengeRepository.save(newUC);
            }
        }

        // 5) 새롭게 채워진 도전과제 포함해 다시 전체 조회
        List<User_challenge> updatedList = challengeRepository.findByUserIdAndCompletedFalse(userPk);
        System.out.println("🔥 updatedList size = " + updatedList.size());
        for (User_challenge uc : updatedList) {
            System.out.println("➡ userId=" + uc.getUserId() +
                    ", challengeId=" + uc.getChallengeId() +
                    ", challengeMaster=" + uc.getChallengeMaster());
        }
        // 6) ChallengeListItem 으로 변환
        List<ChallengeListItem> challengeList = updatedList.stream()
                .map(uc -> new ChallengeListItem(
                        uc.getUserId(),
                        uc.getChallengeId(),
                        uc.getChallengeMaster().getChallengeText(),
                        uc.getChallengeMaster().getTarget(),
                        uc.getProgress(),
                        uc.getChallengeMaster().getCompensation(),
                        uc.getCompleted()
                ))
                .collect(Collectors.toList());

        // 7) 유저의 총 메달(점수) 조회
        Integer userScore = userRepository.findUserScoreById(userPk)
                .orElse(0);

        // 8) Response 생성
        return new ChallengeResponse(challengeList, userScore);
    }


    /**
     * GenericResponse 래핑 버전
     */
    public GenericResponse getUserChallengeListWrapped(Integer userPk) {
        ChallengeResponse challengeData = getUserChallengeList(userPk);



        return GenericResponse.success("챌린지 조회 성공", challengeData);
    }
}

