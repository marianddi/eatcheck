package com.dmu.eatcheck.features.auth.signUp.repository;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignUpRepository extends JpaRepository<User, Integer> {
    boolean existsByUserId(String userId);
    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
}