package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Vite 前端預設 port
@RestController
@RequestMapping("/api/users") // 對應前端的 API 路徑 (採 RESTful 寫法)
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }
}
