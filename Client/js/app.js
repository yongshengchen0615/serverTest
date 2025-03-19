import { fetchItems, searchItems, addItem, editItem, deleteItem } from "./api.js";

// 🔹 載入並顯示資料
async function loadItems() {
    try {
        const items = await fetchItems();
        renderItems(items);
    } catch (error) {
        alert("發生錯誤，無法載入資料！");
    }
}

// 🔹 搜尋功能
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value.trim();
    try {
        const items = await searchItems(query);
        renderItems(items);
    } catch (error) {
        alert(error.message);
    }
});

// 🔹 新增功能
document.getElementById("addBtn").addEventListener("click", async () => {
    const userId = document.getElementById("userId").value.trim();
    const name = document.getElementById("itemName").value.trim();
    const description = document.getElementById("itemDesc").value.trim();

    try {
        await addItem(userId, name, description);
        document.getElementById("userId").value = "";
        document.getElementById("itemName").value = "";
        document.getElementById("itemDesc").value = "";
        loadItems();
    } catch (error) {
        alert("發生錯誤，無法新增資料！");
    }
});

// 🔹 編輯功能
window.editItem = async (id, currentUserId, currentName, currentDesc) => {
    const newUserId = prompt("修改使用者 ID：", currentUserId);
    const newName = prompt("修改名稱：", currentName);
    const newDesc = prompt("修改描述：", currentDesc);

    if (!newUserId || !newName || !newDesc) return;

    try {
        await editItem(id, newUserId, newName, newDesc);
        loadItems();
    } catch (error) {
        alert("發生錯誤，無法更新資料！");
    }
};

// 🔹 刪除功能
window.deleteItem = async (id) => {
    if (!confirm("確定要刪除嗎？")) return;

    try {
        await deleteItem(id);
        loadItems();
    } catch (error) {
        alert("發生錯誤，無法刪除資料！");
    }
};

// 🔹 渲染資料
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

// 🔹 頁面載入時取得所有資料
document.addEventListener("DOMContentLoaded", loadItems);
