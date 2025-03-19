const API_URL = "https://servertest-gvl6.onrender.com/api/items"; // 設定 API 連結

// 🔹 取得所有資料
async function fetchItems() {
    const res = await fetch(API_URL);
    const items = await res.json();
    renderItems(items);
}

// 🔹 搜尋資料
async function searchItems() {
    const query = document.getElementById("searchInput").value;
    if (!query) {
        alert("請輸入查詢關鍵字！");
        return;
    }

    const res = await fetch(`${API_URL}/search?q=${query}`);
    const items = await res.json();
    renderItems(items);
}

// 🔹 新增資料（包含 userId）
async function addItem() {
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("itemName").value;
    const description = document.getElementById("itemDesc").value;

    if (!userId || !name || !description) {
        alert("請輸入完整資料！（使用者 ID、名稱、描述）");
        return;
    }

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, description }),
    });

    if (res.ok) {
        document.getElementById("userId").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("itemDesc").value = "";
        fetchItems(); // 重新載入列表
    }
}

// 🔹 渲染資料列表（顯示 userId）
function renderItems(items) {
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

    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: newUserId, name: newName, description: newDesc }),
    });

    if (res.ok) fetchItems();
}

// 🔹 刪除資料
async function deleteItem(id) {
    if (!confirm("確定要刪除嗎？")) return;

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (res.ok) fetchItems();
}

// 🔹 頁面載入時取得所有資料
document.addEventListener("DOMContentLoaded", fetchItems);