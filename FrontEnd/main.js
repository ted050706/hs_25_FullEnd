/* ----------------------------------------------------
   載入 SCSS 與 Bootstrap（Vite 標準寫法）
---------------------------------------------------- */
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

console.log('Profile Form Ready');

let currentId = null; // 用來暫存目前操作的使用者 ID


// ⭐⭐ 載入頁面時跳出 CRUD 說明視窗 ⭐⭐
window.addEventListener("DOMContentLoaded", () => {
    alert(
        "📌 本頁提供 CRUD [增刪查改] 簡單實作示範：\n\n" +
        "🔹 增：新增一筆使用者資料 (僅存取 暱稱、信箱 2個欄位做示範)\n" +
        "🔹 查：查詢資料 (示範指定查最大ID）\n" +
        "🔹 改：修改目前查到的資料\n" +
        "🔹 刪：刪除目前查到的資料\n\n" +
        "請依序操作按鈕測試功能，謝謝~ 😊"
    );
});



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
				currentId = data.id;	// 暫存目前的 ID，方便後續刪除使用
        document.getElementById("username-id").value = data.username;
        document.getElementById("email-id").value = data.email;

        alert(`最大 ID=${data.id} 的資料已載入！`);

    } catch (err) {
        console.error("查詢最大 ID 發生錯誤：", err);
        alert("查詢失敗：" + err);
    }
});



/* ====================================================
   🔶 功能 3：更新使用者（PUT /api/users/{id}）
==================================================== */
document.getElementById("updateDataBtn-id")?.addEventListener("click", async () => {

    // ⭐ 使用 currentId（由查最大 ID 設定）
    if (!currentId) {
        alert("尚未選擇要修改的資料（請先點擊『查』按鈕，載入最後一筆資料）");
        return;
    }

    const id = currentId;  // ← 正確的 ID 來源
    const username = document.getElementById("username-id").value.trim();
    const email = document.getElementById("email-id").value.trim();

    if (!username || !email) {
        alert("請填寫完整的使用者名稱與 Email");
        return;
    }

    const bodyData = { username, email };

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
            throw new Error("更新失敗，後端回傳錯誤");
        }

        const result = await response.json();
        alert(`更新成功！ID=${result.id}`);

    } catch (error) {
        console.error("更新失敗：", error);
        alert("更新失敗：" + error);
    }
});




/* ====================================================
   🟥 功能 4：刪除使用者（DELETE /api/users/{id}）
==================================================== */
document.getElementById("deleteDataBtn-id")?.addEventListener("click", async () => {

		console.log("刪除按鈕被點擊了！");  // 偵錯用

    // 沒有 currentId → 無法刪除
    if (!currentId) {
        alert("尚未選擇資料（請先查最大 ID）");
        return;
    }

    // 二次確認
    if (!confirm(`確定要刪除 ID=${currentId} 的資料嗎？`)) {
        return;
    }

    try {
        const response = await fetch(`/api/users/${currentId}`, {
            method: "DELETE"
        });

        if (response.status === 404) {
            alert("資料不存在或已被刪除！");
            return;
        }

        if (!response.ok && response.status !== 204) {
            throw new Error("刪除失敗");
        }

        // 清空表單欄位
        document.getElementById("username-id").value = "";
        document.getElementById("email-id").value = "";
        currentId = null; // 清除暫存的 id

        alert("刪除成功！");

    } catch (error) {
        console.error("刪除失敗：", error);
        alert("刪除失敗：" + error);
    }
});

