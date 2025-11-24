package com.dmu.eatcheck.repository;

import com.dmu.eatcheck.entity.Challenge_master;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeMasterRepository extends JpaRepository<Challenge_master, Integer> {
    //findById 메서드의 경우는 JpaRepository에서 이미 지원해주고 있기 때문에 정의할 필요가 없다. -> 필요한 검색필드가 잇을 경우에만 사용
}
