package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("SELECT p FROM UserProfile p WHERE p.user.userId = :userId ORDER BY p.recordDate DESC")
    Optional<UserProfile> findLatestProfile(Long userId);
}

