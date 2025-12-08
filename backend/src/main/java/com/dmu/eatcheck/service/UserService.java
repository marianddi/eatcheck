package com.dmu.eatcheck.service;
//Service : 비즈니스 로직(db값 로직)

import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    //private final PasswordEncoder passwordEncoder; // BCrypt 사용 권장

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        //this.passwordEncoder = passwordEncoder;
    }

    //로그인 db작업
    public boolean login(String userId, String rawPassword) { //전달받은 userId와 비밀번호
        Optional<User> userOpt = userRepository.findByUserId(userId);
        if (userOpt.isEmpty()) return false; //해당 id를 가진 user가 없다면 false반환

        User user = userOpt.get();
        // 비밀번호 비교
        return rawPassword.equals(user.getPassword());
        //return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    @Transactional
    public void changePassword(String userId, String currentPassword, String newPassword, String newPasswordConfirm) {

        // 1. 사용자 조회 및 유효성 검사
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 2. 현재 비밀번호 일치 확인 (로그인 로직 재사용)
        if (!currentPassword.equals(user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 3. 새 비밀번호와 확인 필드 일치 확인
        if (!newPassword.equals(newPasswordConfirm)) {
            throw new IllegalArgumentException("새 비밀번호가 일치하지 않습니다.");
        }

        // 4. 새 비밀번호가 현재 비밀번호와 동일한지 확인
        if (newPassword.equals(currentPassword)) {
            throw new IllegalArgumentException("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
        }

        // 5. 비밀번호 업데이트 및 저장
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}
