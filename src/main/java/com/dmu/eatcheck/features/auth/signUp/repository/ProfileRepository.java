package com.dmu.eatcheck.features.auth.signUp.repository;

import com.dmu.eatcheck.features.auth.signUp.domain.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<UserProfile, Integer> {

    Optional<UserProfile> findByUserId(Integer userId);
}