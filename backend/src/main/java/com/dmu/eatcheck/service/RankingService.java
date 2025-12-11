package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.RankingListItem;
import com.dmu.eatcheck.dto.response.RankingResponse;
import com.dmu.eatcheck.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final RankingRepository rankingRepository;

    public RankingResponse getRanking(Integer userId) {

        // DB에서 JOIN + 전체 정렬된 사용자 목록 가져오기
        List<Object[]> rows = rankingRepository.findAllUsersForRanking();

        AtomicInteger rankCounter = new AtomicInteger(1);

        // TOP 10 리스트 변환
        List<RankingListItem> top10 = rows.stream()
                .limit(10)
                .map(r -> new RankingListItem(
                        rankCounter.getAndIncrement(),
                        ((Number) r[0]).intValue(),    // userId
                        (String) r[3],                 // profileImage
                        (String) r[1],                 // nickname
                        ((Number) r[2]).intValue()     // score
                ))
                .collect(Collectors.toList());

        // 내 랭킹 계산
        int myRank = 1;
        Object[] myRow = null;

        for (Object[] row : rows) {
            Integer rowUserId = ((Number) row[0]).intValue();
            if (rowUserId.equals(userId)) {
                myRow = row;
                break;
            }
            myRank++;
        }

        if (myRow == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다: userId=" + userId);
        }

        RankingListItem me = new RankingListItem(
                myRank,
                ((Number) myRow[0]).intValue(),
                (String) myRow[3],
                (String) myRow[1],
                ((Number) myRow[2]).intValue()
        );

        return new RankingResponse(top10, me);
    }
}
