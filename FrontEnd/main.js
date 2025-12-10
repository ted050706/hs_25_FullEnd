/* ----------------------------------------------------
   載入 SCSS 與 Bootstrap（Vite 標準寫法）
---------------------------------------------------- */
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log('Profile Form Ready');

/* ====================================================
   🔹 功能 1：儲存資料（POST /api/users）
      — 新增使用者：username / email
==================================================== */
document.getElementById("createDataBtn-id")?.addEventListener("click", async () => {

    // 1. 從輸入框取得表單資料
    const username = document.getElementById("username-id").value.trim();
    const email = document.getElementById("email-id").value.trim();

    // 基本欄位檢查
    if (!username || !email) {
        alert("請填寫完整的使用者名稱與 Email");
        return;
    }

    // 2. 封裝成 JSON，要傳給後端
    const bodyData = {
        username: username,
        email: email
    };

    // 3. 發送 POST 請求到後端 API（使用 Vite Proxy → /api → 8081）
    try {
        const response = await fetch("/api/users", {
            method: "POST",                 // RESTful：POST = 新增
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)  // 送出的 JSON
        });

        if (!response.ok) {
            throw new Error("後端回傳錯誤");
        }

        // 後端目前回傳 User JSON，因此先用 text() 接收
        const result = await response.text();

        alert("資料已儲存！後端回傳：" + result);

    } catch (error) {
        console.error("儲存失敗：", error);
        alert("儲存失敗，請稍後再試：" + error);
    }
});



/* ====================================================
   🔹 功能 2：一鍵查最大 ID（GET /api/users/max）
      — 從後端抓出目前資料表「ID 最大」那筆資料
==================================================== */
document.getElementById("readDataBtn-id")?.addEventListener("click", async () => {

    try {
        // 呼叫後端的查最大 ID API
        const response = await fetch("/api/users/max", {
            method: "GET"
        });

        // 若沒有資料，後端會回傳 204 → response.ok 仍為 true，但沒有 body
        if (response.status === 204) {
            alert("資料表目前沒有任何使用者！");
            return;
        }

        if (!response.ok) {
            throw new Error("後端查詢出現錯誤");
        }

        // 把後端回傳的 JSON 轉成 JavaScript 物件
        const data = await response.json();

        console.log("最大 ID 的資料：", data);

        // 將資料顯示在表單欄位中
        // document.getElementById("id-id").value = data.id;         // 顯示 ID（通常 readonly）
        document.getElementById("username-id").value = data.username;
        document.getElementById("email-id").value = data.email;

        alert(`最大 ID=${data.id} 的資料已載入！`);

    } catch (err) {
        console.error("查詢最大 ID 發生錯誤：", err);
        alert("查詢失敗：" + err);
    }
});
