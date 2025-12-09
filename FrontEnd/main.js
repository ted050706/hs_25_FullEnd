import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log('Profile Form Ready');

// 🔹 監聽儲存按鈕（只送 username / email）
document.getElementById("saveBtn-id")?.addEventListener("click", async () => {

    // 1. 取得表單資料
    const username = document.getElementById("username-id").value.trim();
    const email = document.getElementById("email-id").value.trim();

    // 基本檢查
    if (!username || !email) {
        alert("請填寫完整的使用者名稱與 Email");
        return;
    }

    // 2. 封裝 JSON 給後端
    const bodyData = {
        username: username,
        email: email
    };

    try {
        // 3. 呼叫後端 API（使用 Vite Proxy → /api 會導到 8081）
				// 採 RESTful 風格: URL 設為 /api/users。使用 POST 方法新增/更新使用者資料
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error("後端回傳錯誤");
        }

        const result = await response.text();
        alert("資料已儲存！後端回傳：" + result);

    } catch (error) {
        console.error("儲存失敗：", error);
        alert("儲存失敗，請稍後再試"+error);
    }
});
