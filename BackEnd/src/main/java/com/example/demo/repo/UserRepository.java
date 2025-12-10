package com.example.demo.repo;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repository 負責「資料庫 CRUD 操作」
// 這裡繼承 JpaRepository，就能使用 save(), findAll(), findById() 等方法
public interface UserRepository extends JpaRepository<User, Integer> {

    // 查詢資料表中 id 最大的那一筆資料
    // Spring Data JPA 會根據方法名稱自動產生 SQL：
    // SELECT * FROM users ORDER BY id DESC LIMIT 1;
    User findTopByOrderByIdDesc();
		
}
