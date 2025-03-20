import APIService from "./api.js"; // ✅ 必須包含 `.js` 副檔名

// 創建 API 服務實例
const api = new APIService("https://servertest-gvl6.onrender.com/api");

// 取得資料並渲染
async function loadItems() {
    const items = await api.fetchItems();
    renderItems(items);
}

// 渲染資料到列表
function renderItems(items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; 

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "flex justify-between bg-gray-200 p-2 rounded";
        li.innerHTML = `
            ${item.name} - ${item.phone}
            <div>
                <button class="update-btn bg-yellow-500 text-white px-2 py-1 mr-2" data-id="${item._id}">修改</button>
                <button onclick="deleteItem('${item._id}')" class="bg-red-500 text-white px-2 py-1">刪除</button>
            </div>
        `;
        itemList.appendChild(li);
    });

    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function() {
            updateItem(this.getAttribute("data-id"));
        });
    });
}

// 新增資料
async function addItem() {
    const newItem = document.getElementById("newItem").value.trim();
    const newPhone = document.getElementById("newPhone").value.trim();

    if (!newItem) return alert("請輸入名稱");
    if (!newPhone) return alert("請輸入電話");

    await api.addItem(newItem, newPhone);

    document.getElementById("newItem").value = "";
    document.getElementById("newPhone").value = "";

    loadItems();
}

// 更新資料
async function updateItem(id) {
    let newName = prompt("請輸入新的資料名稱：").trim();
    if (!newName) return alert("名稱不可為空！");

    let newPhone = prompt("請輸入新的電話號碼：").trim();
    if (!newPhone) return alert("電話不可為空！");

    await api.updateItem(id, newName, newPhone);
    loadItems();
}

// 刪除資料
async function deleteItem(id) {
    await api.deleteItem(id);
    loadItems();
}

// 搜尋
async function searchItems() {
    const keyword = document.getElementById("searchInput").value.trim();
    const items = await api.searchItems(keyword);
    renderItems(items);
}


// ✅ 讓 HTML 內的 `onclick="addItem()"` 可以找到這些函式
window.addItem = addItem;
window.updateItem = updateItem;
window.deleteItem = deleteItem;
window.searchItems = searchItems;

// 初始化畫面
loadItems();
