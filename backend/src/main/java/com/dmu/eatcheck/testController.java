package com.dmu.eatcheck;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dmu.eatcheck.repository.UserRepository;
import com.dmu.eatcheck.entity.User;

import java.util.List;

@RestController
@RequestMapping("/api")
public class testController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    @Autowired
    private UserRepository userRepo;


    @GetMapping("/testdb")
    public List<User> testDb() { //json으로 반환할 수 잇게
        return userRepo.findAll();
    }
}

