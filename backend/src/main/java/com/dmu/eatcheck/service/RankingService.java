package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.RankingItemResponse;
import com.dmu.eatcheck.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final RankingRepository rankingRepository;

    public List<RankingItemResponse> getTop10Ranking() {

        return rankingRepository.findTop10Users().stream()
                .map(row -> new RankingItemResponse(
                        ((Integer) row[0]),   // user_id → Integer
                        (String) row[1],      // nickname → String
                        ((Integer) row[2])    // total_score → Integer
                ))
                .toList();
    }
}
