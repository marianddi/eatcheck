package com.dmu.eatcheck.repository;


import com.dmu.eatcheck.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {

    @Query("SELECT p FROM UserProfile p WHERE p.user.userId = :userId ORDER BY p.recordDate DESC") //
    Optional<UserProfile> findLatestProfile(Integer userId);

    Optional<UserProfile> findByUser_Id(Integer userPk);
    @Query("SELECT up.profileImage FROM UserProfile up WHERE up.user.id = :id")
    Optional<String> findUserProfileImageById(@Param("id") Integer userPk);
    @Query("SELECT up.weight FROM UserProfile up WHERE up.user.id = :id")
    BigDecimal findUserWeightById(@Param("id") Integer userPk);
}
