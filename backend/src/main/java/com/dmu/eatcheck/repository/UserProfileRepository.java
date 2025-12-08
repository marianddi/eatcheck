package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User_profile;
import com.dmu.eatcheck.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<User_profile, Integer> {
    @Query("SELECT up.profileImage FROM User_profile up WHERE up.user.id = :id")
    Optional<String> findUserProfileImageById(@Param("id") Integer userPk);
    @Query("SELECT up.weight FROM User_profile up WHERE up.user.id = :id")
    BigDecimal findUserWeightById(@Param("id") Integer userPk);


    @Query("SELECT p FROM UserProfile p WHERE p.user.userId = :userId ORDER BY p.recordDate DESC") //UserProfile, Long
    Optional<UserProfile> findLatestProfile(Long userId);
}
