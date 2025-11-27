package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.User_profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<User_profile, Integer> {

}
