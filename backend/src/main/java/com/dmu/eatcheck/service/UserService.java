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
    public boolean login(Integer userId, String rawPassword) {
        Integer id = Integer.parseInt(String.valueOf(userId)); // 문자열을 숫자로 변환

        Optional<User> userOpt = userRepository.findByUserId(userId);
        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();
        return rawPassword.equals(user.getPassword());
    }

}
