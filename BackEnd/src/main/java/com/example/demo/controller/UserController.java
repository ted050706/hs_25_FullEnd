package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") 
// 允許 Vite (port 5173) 呼叫後端 API，避免 CORS 問題

@RestController
@RequestMapping("/api/users") 
// 採 RESTful 寫法：
// POST   /api/users       → 新增
// GET    /api/users/max   → 查最大 ID
public class UserController {

    private final UserRepository userRepo;

    // 建構子注入 Repository，較現代的寫法（避免使用 @Autowired）
    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ========================================================
    // 🟦 1. Create（新增使用者）
    // ========================================================
    @PostMapping
    public User createUser(@RequestBody User user) {
        // save() 同時支援新增與更新：
        // 若 user.id == null → 新增
        // 若 user.id != null → 視為更新
        return userRepo.save(user);
    }

    // =========================================================
    // 🟩 2. Read：查詢最大 ID 的資料（你的一鍵查功能）
    // =========================================================
    @GetMapping("/max")
    public ResponseEntity<User> getMaxUser() {

        // 呼叫 Repository 取得「id 最大」的那筆資料
        User maxUser = userRepo.findTopByOrderByIdDesc();

        if (maxUser == null) {
            // 若資料庫尚無紀錄 → 回傳 204 No Content
            return ResponseEntity.noContent().build();
        }

        // 成功查到資料 → 回傳 JSON
        return ResponseEntity.ok(maxUser);
    }

		
		// ========================================================
		// 🟧 Update：更新指定 ID 的使用者資料
		// ========================================================
		@PutMapping("/{id}")
		public ResponseEntity<User> updateUser(
						@PathVariable Integer id,
						@RequestBody User updatedUser) {

				// 檢查此 ID 的資料是否存在
				return userRepo.findById(id)
								.map(user -> {
										// 更新資料欄位
										user.setUsername(updatedUser.getUsername());
										user.setEmail(updatedUser.getEmail());

										// 儲存至資料庫
										User saved = userRepo.save(user);

										return ResponseEntity.ok(saved);
								})
								.orElseGet(() -> ResponseEntity.notFound().build());
		}



}
