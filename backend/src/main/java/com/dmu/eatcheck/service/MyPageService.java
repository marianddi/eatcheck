package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.dto.response.MyPageResponse;
import com.dmu.eatcheck.dto.response.WeightLogItem;
import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.UserProfileListRepository;
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
    private final UserProfileListRepository userProfileListRepository;
    private final WeightLogRepository weightLogRepository;

    //마이페이지 정보 조회 기능
    public GenericResponse getUserInfo(Integer userPk){
        //사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        //현재 사용자의 닉네임 가져오기
        String nickname = userRepository.findUserNicknameById(userPk);

        //현재 사용자 프로필 이미지 가져오기
        String profileImage = userProfileListRepository.findUserProfileImageById(userPk)
                .orElse("default_profile");

        //사용자의 현재 몸무게 가져오기
        BigDecimal weight = userProfileListRepository.findUserWeightById(userPk);

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


    //비밀번호 변경 기능
    public GenericResponse changePassword(Integer userPk, String password, String newPassword, String newPasswordCheck){
        // 사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));
        
        //빈칸인지 확인
        if(password == null){
            return GenericResponse.error("현재 비밀번호를 입력해주세요.");
        }
        else if(newPassword == null){
            return GenericResponse.error("새로운 비밀번호를 입력해주세요.");
        }
        else if(newPasswordCheck == null){
            return GenericResponse.error("새로운 비밀번호 확인을 입력해주세요.");
        }







        // 비밀번호 일치 확인
        if(!password.equals(user.getPassword())){
            return GenericResponse.error("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호 확인
        if(!newPassword.equals(newPasswordCheck)){
            return GenericResponse.error("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

        // 비밀번호 길이 제한 (예: 최소 6자) ->임시임.
        if(newPassword.length() < 6){
            return GenericResponse.error("새 비밀번호는 최소 6자 이상이어야 합니다.");
        }

        // 비밀번호 변경
        user.setPassword(newPassword);
        userRepository.save(user); //db에 변경사항 반영 ->update쿼리 실행

        return GenericResponse.success("비밀번호 변경 완료", null);
    }

}
