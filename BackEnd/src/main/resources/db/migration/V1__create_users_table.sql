-- 新建資料表 users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    gender ENUM('male','female','unknown') DEFAULT 'unknown',
    birthday DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    avatar_path VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);