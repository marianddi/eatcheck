package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.request.ChallengeCompleteRequest;
import com.dmu.eatcheck.dto.response.ChallengeResponse2;
import com.dmu.eatcheck.dto.response.UserChallengeItem2;
import com.dmu.eatcheck.entity.Challenge_master;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.entity.User_challenge;
import com.dmu.eatcheck.repository.ChallengeRepository2;
import com.dmu.eatcheck.repository.UserChallengeRepository2;
import com.dmu.eatcheck.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService2 {

    private final UserRepository userRepository;
    private final ChallengeRepository2 challengeRepository2;
    private final UserChallengeRepository2 userChallengeRepository2;

    /**
     * 🔥 유저의 현재 챌린지 목록 조회 (부족하면 자동 생성)
     */
    public ChallengeResponse2 getUserChallenges(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 현재 유저의 진행 중인 챌린지
        List<User_challenge> existing = userChallengeRepository2.findByUserId(userId);

        // 부족한 경우 (랜덤 챌린지 생성)
        if (existing.size() < 4) {
            int need = 4 - existing.size();
            List<Challenge_master> random = challengeRepository2.findRandomChallenges(need);

            for (Challenge_master c : random) {

                // 중복 체크
                User_challenge dup =
                        userChallengeRepository2.findByUserIdAndChallengeId(userId, c.getId());
                if (dup != null) continue;

                User_challenge uc = new User_challenge();
                uc.setUser(user);
                uc.setChallengeMaster(c);
                uc.setProgress(0);
                uc.setCompleted(false);

                userChallengeRepository2.save(uc);
            }

            // 다시 조회
            existing = userChallengeRepository2.findByUserId(userId);
        }

        // DTO 변환
        List<UserChallengeItem2> converted = existing.stream()
                .map(uc -> new UserChallengeItem2(
                        uc.getChallengeMaster().getId(),
                        uc.getChallengeMaster().getChallengeText(),
                        uc.getChallengeMaster().getCompensation(),  // score
                        uc.getProgress(),
                        uc.getChallengeMaster().getTarget(),
                        uc.getCompleted()
                ))
                .toList();

        return new ChallengeResponse2(user.getTotalScore(), converted);
    }

    /**
     * 🔥 도전과제 완료 처리 API
     *   1) 점수 증가
     *   2) user_challenge 삭제
     *   3) 부족한 챌린지 자동 생성
     */
    @Transactional
    public ChallengeResponse2 completeChallenge(ChallengeCompleteRequest req) {

        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        User_challenge uc =
                userChallengeRepository2.findByUserIdAndChallengeId(req.getUserId(), req.getChallengeId());

        if (uc == null)
            throw new RuntimeException("해당 도전과제를 찾을 수 없습니다.");

        Challenge_master cm = uc.getChallengeMaster();

        // 1) 점수 증가
        int newScore = user.getTotalScore() + cm.getCompensation();
        user.setTotalScore(newScore);
        userRepository.saveAndFlush(user); // 🔥 DB 즉시 반영

        // 2) 챌린지 삭제
        userChallengeRepository2.delete(uc);

        // 3) 부족한 챌린지 채워넣기
        refillChallenges(req.getUserId(), user);

        // 최신 상태 반환
        return getUserChallenges(req.getUserId());
    }

    private void refillChallenges(Integer userId, User user) {

        List<User_challenge> remain = userChallengeRepository2.findByUserId(userId);

        if (remain.size() >= 4) return;

        int need = 4 - remain.size();
        List<Challenge_master> random = challengeRepository2.findRandomChallenges(need);

        for (Challenge_master c : random) {

            User_challenge dup =
                    userChallengeRepository2.findByUserIdAndChallengeId(userId, c.getId());
            if (dup != null) continue;

            User_challenge newUc = new User_challenge();
            newUc.setUser(user);
            newUc.setChallengeMaster(c);
            newUc.setProgress(0);
            newUc.setCompleted(false);

            userChallengeRepository2.save(newUc);
        }
    }

}
