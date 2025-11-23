package com.dmu.eatcheck.repository;
//db접근
import com.dmu.eatcheck.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
   Optional<User> findByUserId(String userId); //User엔티티 안에 있는 userId 필드를 기준으로 검색하라는 의미 //select * from user_id = ?
}
