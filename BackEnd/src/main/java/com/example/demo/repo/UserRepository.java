package com.example.demo.repo;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JPA Repository 用來操作資料庫
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // 這裡可以加自訂查詢，例如: findByEmail(String email)
		
}
