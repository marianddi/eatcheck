package com.dmu.eatcheck.service;

import com.dmu.eatcheck.dto.response.*;
import com.dmu.eatcheck.entity.*;
import com.dmu.eatcheck.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MyPageService {
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;
    private final WeightLogRepository weightLogRepository;
    private final GoalRepository goalRepository;

    private static final int CALORIES_PER_KG_FAT = 7700;
    private static final double ACTIVITY_FACTOR_MIN = 1.2;
    private static final double ACTIVITY_FACTOR_MAX = 2.0;
    private static final double ACTIVITY_FACTOR_RANGE = ACTIVITY_FACTOR_MAX - ACTIVITY_FACTOR_MIN; // 0.8

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

    private double lerp(double a, double b, double t) {
        return a + t * (b - a);
    }

    private Integer calculateBMR(Gender gender, BigDecimal weight, BigDecimal height, Integer age) {
        double w = weight.doubleValue();
        double h = height.doubleValue();
        double a = age.doubleValue();
        double bmr;

        if (gender == Gender.MALE) {
            bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
        } else {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
        }
        return (int) Math.round(bmr);
    }

    private Integer calculateRecommendedCalorie(Integer tdee, double currentWeightKg, double targetWeightKg, Integer targetDurationDays) {

        // 1. 현상 유지 조건: 기간이 없거나 (null 또는 0), 목표 체중과 현재 체중이 같으면 TDEE 반환
        if (targetDurationDays == null || targetDurationDays <= 0 || currentWeightKg == targetWeightKg) {
            return tdee;
        }

        // 2. 증량/감량 목표 계산
        double weightDifference = currentWeightKg - targetWeightKg;

        // 권장 칼로리 계산식: TDEE + ((기존 몸무게 - 목표 몸무게) X 7700) / 목표기간
        double goalCalorieChange = (weightDifference * CALORIES_PER_KG_FAT) / targetDurationDays;

        return (int) Math.round(tdee + goalCalorieChange);
    }

    //사용자 신체조건 변경 조회(가져오기)
    public GenericResponse getBodyInfo(Integer userPk){
        // 사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        UserProfile up = userProfileRepository.findByUser_Id(userPk)
                .orElseThrow(() -> new RuntimeException("사용자 신체 정보가 없습니다."));
        BodyInfoDto bodyData = new BodyInfoDto(up.getAge(), up.getUser().getGender(), up.getHeight(), up.getWeight(), up.getActivityLevel(), up.getBmr());
        return GenericResponse.success("사용자 신체정보 조회 성공", bodyData);
    }

    //사용자 신체조건 변경(키, 몸무게, 주당 운동시간, 기초대사량만)
    public GenericResponse setBodyInfo(Integer userPk, BigDecimal height, BigDecimal weight, Integer bmr, String activityLevelStr){
        // 사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        //빈칸인지 확인
        if(height == null){
            return GenericResponse.error("키를 입력해주세요.");
        }
        else if(weight == null){
            return GenericResponse.error("몸무게를 입력해주세요.");
        }
        else if(bmr == null){
            return GenericResponse.error("기초대사량을 입력해주세요.");
        }
        else if(activityLevelStr == null){
            return GenericResponse.error("주당 운동시간을 입력해주세요.");
        }

        //비정상적인 값 차단(나중에)
        //enum검증
        ActivityLevel activityLevel;
        try {
            activityLevel = ActivityLevel.valueOf(activityLevelStr);
        } catch (Exception e) {
            return GenericResponse.error("잘못된 활동 레벨 값입니다.");
        }



        UserProfile up = userProfileRepository.findByUser_Id(userPk)
                .orElseThrow(() -> new RuntimeException("사용자 신체 정보가 없습니다."));

        // 💡 1. BMR 및 TDEE 재계산

        // BMR (bmr 매개변수는 무시하고 실제 값 재계산)
        Integer newBmr = calculateBMR(
                user.getGender(),
                weight,
                height,
                up.getAge() // up.getAge()는 기존 프로필에서 가져와야 함 (새 입력값에 age가 없으므로)
        );

        double activityCoefficient = activityLevel.getCoefficient();
        Integer tdee = (int) Math.round(newBmr * activityCoefficient);

        // 💡 2. 권장 칼로리 및 영양성분 재계산 (기존 목표 반영)

        // 현재 몸무게, 목표 몸무게, 기간 가져오기 (기존 프로필 값 사용)
        BigDecimal targetWeight = up.getTargetWeight();
        Integer targetDurationDays = up.getTargetDurationDays();

        // 권장 칼로리 계산
        Integer recommendedCalorie = calculateRecommendedCalorie(
                tdee,
                weight.doubleValue(), // 새로운 현재 체중
                targetWeight != null ? targetWeight.doubleValue() : weight.doubleValue(), // 목표 체중
                targetDurationDays // 달성 기간
        );

        // 권장 영양성분 계산 (TDEE 기반)
        double t_pro = (activityCoefficient - ACTIVITY_FACTOR_MIN) / ACTIVITY_FACTOR_RANGE;
        if (t_pro < 0) t_pro = 0;
        if (t_pro > 1) t_pro = 1;

        double proFactor = lerp(1.0, 2.0, t_pro);

        // 단백질 (체중 * 계수)
        int recommendedProtein = (int) Math.round(weight.doubleValue() * proFactor);
        int proteinKcal = recommendedProtein * 4;

        // 지방 (총 칼로리의 25%)
        int fatKcal = (int) (recommendedCalorie * 0.25);
        int recommendedFat = fatKcal / 9;

        // 탄수화물 (나머지 칼로리)
        int carbKcal = recommendedCalorie - proteinKcal - fatKcal;
        if (carbKcal < 0) carbKcal = 0;
        int recommendedCarb = carbKcal / 4;


        //기존 몸무게 조회 (기존 로직)
        BigDecimal oldWeight = up.getWeight();

        // 몸무게 변경 시 Weight_log 생성 (기존 로직 유지)
        if (oldWeight == null || oldWeight.compareTo(weight) != 0) {
            Weight_log log = new Weight_log();
            log.setUser(user);
            log.setUserProfile(up);
            log.setWeight(weight);
            log.setRecordedAt(new Date());

            weightLogRepository.save(log);
        }

        // 💡 3. 신체조건 및 권장 영양성분 변경 반영
        up.setHeight(height);
        up.setWeight(weight);
        up.setActivityLevel(activityLevel);

        // 💡 재계산된 값으로 업데이트
        up.setBmr(newBmr);
        up.setTdee(tdee);
        up.setRecommendedCalorie(recommendedCalorie);
        up.setRecommendedProtein(recommendedProtein);
        up.setRecommendedFat(recommendedFat);
        up.setRecommendedCarb(recommendedCarb);

        userProfileRepository.save(up);

        return GenericResponse.success("신체조건 변경 완료", null);
    }

    //목표 데이터 조회
    public GenericResponse getGoalData(Integer userPk){
        // 사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        Goal goal = goalRepository.findByUserId(userPk)
                .orElseThrow(() -> new RuntimeException("사용자 신체 정보가 없습니다."));

        //처음 설정 일 수 // 남은 일 수
        long totalDays = ChronoUnit.DAYS.between(goal.getStartDate(), goal.getEndDate()); //ChronoUnit.DAYS : 일단위로 계산
        long remainingDays = ChronoUnit.DAYS.between(LocalDate.now(), goal.getEndDate());

        GoalDataDto goalData = new GoalDataDto(goal.getTargetWeight(), totalDays, remainingDays, goal.getStartDate(), goal.getEndDate());
        return GenericResponse.success("사용자 목표 데이터 조회 성공", goalData);
    }



    //목표 데이터 변경(weight_log에 기록할 것)
    public GenericResponse setGoalData(Integer userPk, Double goalWeight, Integer days){
        // 사용자 존재 확인
        User user = userRepository.findById(userPk)
                .orElseThrow(() -> new RuntimeException("해당 사용자를 찾을 수 없습니다."));

        //빈칸인지 확인
        if(goalWeight == null){
            return GenericResponse.error("목표 몸무게를 입력해주세요.");
        }
        else if(days == null){
            return GenericResponse.error("목표 일 수를 입력해주세요.");
        }

        //기존 goal조회 또는 새로 생성
        Goal goal = goalRepository.findByUserId(userPk).orElseGet(() -> {
            Goal g = new Goal();
            g.setUser(user);
            g.setStartDate(LocalDate.now());
            g.setEndDate(LocalDate.now().plusDays(days));
            return g;
        });

        LocalDate today = LocalDate.now();

        // 변경 여부 판단
        boolean weightChanged = !goalWeight.equals(goal.getTargetWeight());
        boolean periodChanged = days != null && (goal.getEndDate() == null
                || !goal.getEndDate().equals(goal.getStartDate().plusDays(days)));

        // 기간 변경 처리
        if (periodChanged) {
            goal.setStartDate(today);
            goal.setEndDate(today.plusDays(days));
        }

        // 몸무게 변경 처리
        if (weightChanged) {
            goal.setTargetWeight(goalWeight);
            goal.setUpdateAt(today);
        }

        //Goal 저장 -> 엔티티 반영
        goalRepository.save(goal);

        return GenericResponse.success("목표 데이터 변경 완료", null);
    }

    //알레르기 음식 조회
    public GenericResponse getAllergyFoods(Integer userPk) {
        UserProfile up = userProfileRepository.findByUser_Id(userPk)
                .orElseThrow(() -> new RuntimeException("사용자 신체 정보가 없습니다."));

        // Set<AllergyFood> → List<String>로 변환
        List<String> allergyFoods = up.getAllergyFoods()
                .stream()
                .map(Enum::name)
                .collect(Collectors.toList());

        return GenericResponse.success("알레르기 음식 조회 성공", allergyFoods);
    }
    // 알레르기 음식 변경
    public GenericResponse setAllergyFoods(Integer userPk, List<String> allergyFoodsStr) {

        UserProfile up = userProfileRepository.findByUser_Id(userPk)
                .orElseThrow(() -> new RuntimeException("사용자 신체 정보가 없습니다."));

        Set<AllergyFood> foods = new HashSet<>();
        for (String foodStr : allergyFoodsStr) {
            foods.add(AllergyFood.valueOf(foodStr));
        }

        up.getAllergyFoods().clear();
        up.getAllergyFoods().addAll(foods);
        userProfileRepository.save(up);

        return GenericResponse.success("알레르기 음식 변경 완료", null);
    }

}
