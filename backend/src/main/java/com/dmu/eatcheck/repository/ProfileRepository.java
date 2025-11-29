package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<UserProfile, Integer> {

    Optional<UserProfile> findByUserId(Integer userId);
}