package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.RankingListItem;
import com.dmu.eatcheck.dto.response.RankingResponse;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final UserRepository userRepository;

    public RankingResponse getRanking(Integer userId) {
        // 전체 유저 리스트 점수 순
        List<User> allUsers = userRepository.findAllByIsDeletedFalseOrderByTotalScoreDesc();


        // 전체 랭킹 리스트 DTO 변환
        List<RankingListItem> rankingList = allUsers.stream()
                .limit(10)
                .map(new java.util.function.Function<User, RankingListItem>() {
                    int rank = 1; // 랭크 시작 번호
                    @Override
                    public RankingListItem apply(User u) {
                        RankingListItem item = new RankingListItem(
                                rank++, // 순위 부여
                                u.getUserProfile() != null ? u.getUserProfile().getProfileImage() : null,
                                u.getNickname(),
                                u.getTotalScore()
                        );
                        return item;
                    }
                })
                .collect(Collectors.toList());

        // 내 정보
        User me = allUsers.stream()
                .filter(u -> u.getId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 내 순위 계산
        int myRank = 1;
        for (User u : allUsers) {
            if (u.getId().equals(userId)) break;
            myRank++;
        }

        RankingListItem myRankingItem = new RankingListItem(
                myRank,
                me.getUserProfile() != null ? me.getUserProfile().getProfileImage() : null,
                me.getNickname(),
                me.getTotalScore()
        );

        return new RankingResponse(rankingList, myRankingItem);
    }
}
