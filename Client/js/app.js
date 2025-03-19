const API_URL = "https://servertest-gvl6.onrender.com/api/items"; // 設定 API 連結

// 🔹 取得所有資料
async function fetchItems() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();

        // 🔹 確保後端回應格式正確
        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("後端回應格式錯誤");
        }

        renderItems(result.data);
    } catch (error) {
        console.error("❌ 取得資料失敗:", error);
        alert("發生錯誤，無法載入資料！");
    }
}

// 🔹 搜尋資料
async function searchItems() {
    const query = document.getElementById("searchInput").value;
    if (!query) {
        alert("請輸入查詢關鍵字！");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/search?q=${query}`);
        const result = await res.json();

        // 🔹 檢查 API 回應格式
        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("查詢結果格式錯誤");
        }

        renderItems(result.data);
    } catch (error) {
        console.error("❌ 搜尋資料失敗:", error);
        alert("查詢發生錯誤，請稍後再試！");
    }
}

// 🔹 新增資料（包含 userId）
async function addItem() {
    const userId = document.getElementById("userId").value.trim();
    const name = document.getElementById("itemName").value.trim();
    const description = document.getElementById("itemDesc").value.trim();

    if (!userId || !name || !description) {
        alert("請輸入完整資料！（使用者 ID、名稱、描述）");
        return;
    }

    try {
        const requestBody = JSON.stringify({ userId, name, description });
        console.log("📌 發送到後端的資料:", requestBody); // 🔹 確保 userId 被傳送

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
        });

        const result = await res.json();
        console.log("📌 伺服器回應:", result); // 🔹 檢查後端回應

        if (!res.ok || !result.success) {
            throw new Error("新增資料失敗");
        }

        document.getElementById("userId").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("itemDesc").value = "";

        fetchItems(); // 重新載入列表
    } catch (error) {
        console.error("❌ 無法新增資料:", error);
        alert("發生錯誤，無法新增資料！");
    }
}

// 🔹 渲染資料列表（顯示 userId）
function renderItems(items) {
    if (!Array.isArray(items)) {
        console.error("❌ renderItems() 失敗，items 不是陣列:", items);
        return;
    }

    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>[${item.userId}] ${item.name} - ${item.description}</span>
            <div>
                <button class="edit" onclick="editItem('${item._id}', '${item.userId}', '${item.name}', '${item.description}')">✏️ 編輯</button>
                <button class="delete" onclick="deleteItem('${item._id}')">❌ 刪除</button>
            </div>
        `;
        itemList.appendChild(li);
    });
}

// 🔹 編輯資料（包含 userId）
async function editItem(id, currentUserId, currentName, currentDesc) {
    const newUserId = prompt("修改使用者 ID：", currentUserId);
    const newName = prompt("修改名稱：", currentName);
    const newDesc = prompt("修改描述：", currentDesc);

    if (!newUserId || !newName || !newDesc) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: newUserId, name: newName, description: newDesc }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error("更新資料失敗");
        }

        fetchItems(); // 更新畫面
    } catch (error) {
        console.error("❌ 更新資料失敗:", error);
        alert("發生錯誤，無法更新資料！");
    }
}

// 🔹 刪除資料
async function deleteItem(id) {
    if (!confirm("確定要刪除嗎？")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error("刪除資料失敗");
        }

        fetchItems(); // 重新載入列表
    } catch (error) {
        console.error("❌ 刪除資料失敗:", error);
        alert("發生錯誤，無法刪除資料！");
    }
}

// 🔹 頁面載入時取得所有資料
document.addEventListener("DOMContentLoaded", fetchItems);
