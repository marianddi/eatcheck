package com.dmu.eatcheck.service;
//Service : 비즈니스 로직(db값 로직)

import com.dmu.eatcheck.entity.User;
import com.dmu.eatcheck.repository.UserRepository;
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
}
