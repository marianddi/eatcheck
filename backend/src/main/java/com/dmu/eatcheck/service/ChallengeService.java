package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.ChallengeListItem;
import com.dmu.eatcheck.dto.response.ChallengeResponse;
import com.dmu.eatcheck.dto.response.GenericResponse;
import com.dmu.eatcheck.entity.User_challenge;
import com.dmu.eatcheck.repository.ChallengeMasterRepository;
import com.dmu.eatcheck.repository.ChallengeRepository;
import com.dmu.eatcheck.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;



    public ChallengeResponse getUserChallengeList(Integer userPk){
        //현재 사용자의 user_challenge 리스트 조회
        List<User_challenge> list = challengeRepository.findByUserId(userPk);

        //필요한 컬럼만 한 리스트에 관리하기 위해 새로운 타입으로 변환하여 저장
        List<ChallengeListItem> challengeList = list.stream()
                .map(uc -> new ChallengeListItem( //.map()을 통해서 현재 list에 저장된 데이터들을 필요한 칼럼만 뽑은 객체인  ChallengeListItem으로 변환하여 저장
                        uc.getUser().getId(),
                        uc.getChallengeMaster().getId(),
                        uc.getChallengeMaster().getChallengeText(),
                        uc.getChallengeMaster().getTarget(),
                        uc.getProgress(),
                        uc.getChallengeMaster().getCompensation(),
                        uc.getCompleted()
                ))
                .collect(Collectors.toList());

        //현재 사용자가 가진 메달 수 조회 후 가져오기
        Integer userScore = userRepository.findUserScoreById(userPk)
                .orElse(0); //값이 없을 경우 0반환

        //.orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다."));
        //이 예외처리는 해당 메소드가 Optional형태로 값을 반환할 때 Optional안이 비어있을 경우 사용하는데 값이 있을 경우에는 그대로 값을 반환하고 없을 경우에는 예외 처리를 하는 코드이다.
        //orElse(0)같이 0으로 반환도 가능 -> 유저 아이디가 없을 수가 없으니 0으로 기본값처리
        return new ChallengeResponse(challengeList, userScore);
    }

    public GenericResponse getUserChallengeListWrapped(Integer userPk){
        ChallengeResponse challengeData = getUserChallengeList(userPk);
        return GenericResponse.success("챌린지 조회 성공", challengeData);
    }
}
