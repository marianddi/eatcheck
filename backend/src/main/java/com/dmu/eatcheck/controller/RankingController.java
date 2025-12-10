package com.dmu.eatcheck.controller;

import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.dto.response.RankingListItem;
import com.dmu.eatcheck.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/ranking")
public class RankingController {

    private final RankingRepository rankingRepository;

    @GetMapping("/top10")
    public GenericResponse getTop10() {

        List<Object[]> results = rankingRepository.findTop10UsersWithProfile();

        List<RankingListItem> list = results.stream()
                .map(row -> new RankingListItem(
                        null,                           // rank (여기서는 null)
                        (String) row[3],                // profile_image
                        (String) row[1],                // nickname
                        Integer.parseInt(row[2].toString()) // total_score
                ))
                .collect(Collectors.toList());

        return GenericResponse.success("성공", list);
    }

    @GetMapping("/me")
    public GenericResponse getMyRanking(@RequestParam Integer userId) {
        log.info("내 랭킹 조회 userId={}", userId);
        // UserRepository의 findRankingByScore() 활용
        return GenericResponse.success("내 랭킹 조회", null);
    }
}