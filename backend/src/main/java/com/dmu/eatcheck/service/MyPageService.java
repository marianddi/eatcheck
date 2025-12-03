package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.dto.response.MyPageResponse;
import com.dmu.eatcheck.dto.response.WeightLogItem;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.UserProfileRepository;
import com.dmu.eatcheck.repository.UserRepository;
import com.dmu.eatcheck.repository.WeightLogRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MyPageService {
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final WeightLogRepository weightLogRepository;

    //마이페이지 정보 조회 기능
    public GenericResponse getUserInfo(Integer userPk){
        //사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        //현재 사용자의 닉네임 가져오기
        String nickname = userRepository.findUserNicknameById(userPk);

        //현재 사용자 프로필 이미지 가져오기
        String profileImage = userProfileRepository.findUserProfileImageById(userPk)
                .orElse("default_profile");

        //사용자의 현재 몸무게 가져오기
        BigDecimal weight = userProfileRepository.findUserWeightById(userPk);

        //2주 간격으로 사용자의 이전 몸무게 가져오기 -> 그래프에서 사용
        List<WeightLogItem> logs = weightLogRepository.findByUserId(userPk).stream()
                .map(w -> new WeightLogItem(
                        new java.text.SimpleDateFormat("yyyy-MM-dd")
                                .format(w.getRecordedAt()),
                        w.getWeight()
                ))
                .toList();

        MyPageResponse userInfoData =  new MyPageResponse(profileImage, nickname, weight, logs);
        return GenericResponse.success("마이페이지 유저 정보 조회 성공", userInfoData);
    }



}
