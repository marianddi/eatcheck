package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.ChallengeRecommendResponse;
import com.dmu.eatcheck.entity.ChallengeList;
import com.dmu.eatcheck.entity.Goal;
import com.dmu.eatcheck.entity.UserProfile;
import com.dmu.eatcheck.model.enums.UserGoalType;
import com.dmu.eatcheck.repository.ChallengeListRepository;
import com.dmu.eatcheck.repository.GoalRepository;
import com.dmu.eatcheck.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ChallengeRecommendService {

    private final ChallengeListRepository challengeRepo;
    private final UserProfileRepository userProfileRepo;
    private final GoalRepository goalRepo;

    /** 사용자 목표 타입 판별 */
    private UserGoalType evaluateUserGoal(Long userId) {

        try {
            if (userId == null) {
                return UserGoalType.MAINTAIN;
            }

            Optional<UserProfile> profileOpt = userProfileRepo.findLatestProfile(userId);
            Optional<Goal> goalOpt = goalRepo.findActiveGoal(userId);

            if (profileOpt.isEmpty() || goalOpt.isEmpty()) {
                return UserGoalType.MAINTAIN;
            }

            double currentWeight = profileOpt.get().getWeight();
            double targetWeight = goalOpt.get().getTargetWeight();

            if (targetWeight < currentWeight) return UserGoalType.DIET;
            if (targetWeight > currentWeight) return UserGoalType.BULK;
            return UserGoalType.MAINTAIN;

        } catch (Exception e) {
            return UserGoalType.MAINTAIN;
        }
    }

    /** 추천 로직 */
    public ChallengeRecommendResponse recommend(Long userId) {

        UserGoalType type = evaluateUserGoal(userId);
        List<ChallengeList> candidates;

        switch (type) {
            case DIET -> candidates = challengeRepo.findByType("DIET");
            case BULK -> candidates = challengeRepo.findByType("BULK");
            default -> candidates = challengeRepo.findByType("LIFESTYLE");
        }

        if (candidates.isEmpty()) {
            candidates = challengeRepo.findByType("LIFESTYLE");
        }

        if (candidates.isEmpty()) {
            candidates = challengeRepo.findAll();
        }

        ChallengeList selected =
                candidates.get(new Random().nextInt(candidates.size()));

        return new ChallengeRecommendResponse(
                selected.getChallengeId(),
                selected.getName(),
                selected.getScore(),
                selected.getType(),
                type.name()
        );
    }
}
