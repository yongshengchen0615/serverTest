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

// 🔹 新增資料
async function addItem() {
    const name = document.getElementById("itemName").value;
    const description = document.getElementById("itemDesc").value;

    if (!name || !description) {
        alert("請輸入完整資料！");
        return;
    }

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
        document.getElementById("itemName").value = "";
        document.getElementById("itemDesc").value = "";
        fetchItems(); // 重新載入列表
    }
}

// 🔹 編輯資料
async function editItem(id, currentName, currentDesc) {
    const newName = prompt("修改名稱：", currentName);
    const newDesc = prompt("修改描述：", currentDesc);

    if (!newName || !newDesc) return;

    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, description: newDesc }),
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

// 🔹 渲染資料列表
function renderItems(items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} - ${item.description}</span>
            <div>
                <button class="edit" onclick="editItem('${item._id}', '${item.name}', '${item.description}')">✏️ 編輯</button>
                <button class="delete" onclick="deleteItem('${item._id}')">❌ 刪除</button>
            </div>
        `;
        itemList.appendChild(li);
    });
}

// 🔹 頁面載入時取得所有資料
document.addEventListener("DOMContentLoaded", fetchItems);