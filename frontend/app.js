 // 伺服器 API 的基礎 URL
const API_URL = "https://servertest-gvl6.onrender.com/api/items";

// 取得所有資料並顯示在畫面上
async function fetchItems() {
    const res = await fetch(API_URL); // 向 API 發送 GET 請求，取得所有資料
    const items = await res.json(); // 將回傳的 JSON 轉換成 JavaScript 陣列
    renderItems(items); // 呼叫 renderItems()，更新 UI
}

// 渲染資料到網頁上的列表
function renderItems(items) {
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = ""; // 清空列表，避免重複顯示

    items.forEach(item => {
        const li = document.createElement("li"); // 創建 <li> 元素
        li.className = "flex justify-between bg-gray-200 p-2 rounded";
        li.innerHTML = `
            ${item.name} - ${item.phone}
            <div>
                <button class="update-btn bg-yellow-500 text-white px-2 py-1 mr-2" data-id="${item._id}">修改</button>
                <button onclick="deleteItem('${item._id}')" class="bg-red-500 text-white px-2 py-1">刪除</button>
            </div>
        `;
        itemList.appendChild(li); // 將 <li> 加入列表
    });

    // 修正 onclick 綁定問題，改用事件監聽
    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function() {
            updateItem(this.getAttribute("data-id"));
        });
    });
}

// 新增資料
async function addItem() {
    const newItem = document.getElementById("newItem").value; // 取得輸入框的值
    const newPhone = document.getElementById("newPhone").value; // 取得輸入框的值
    if (!newItem) return alert("請輸入資料"); // 檢查是否為空
    if (!newPhone) return alert("請輸入電話"); // 檢查是否為空

    await fetch(API_URL, {
        method: "POST", // 使用 POST 方法新增資料
        headers: { "Content-Type": "application/json" }, // 指定資料格式
        body: JSON.stringify({ name: newItem,phone:newPhone }) // 傳遞資料
    });

    document.getElementById("newItem").value = ""; // 清空輸入框
    document.getElementById("newPhone").value = ""; // 清空輸入框
    fetchItems(); // 重新獲取並渲染資料
}

// 刪除資料
async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // 透過 DELETE 請求刪除指定 ID 的資料
    fetchItems(); // 重新獲取並渲染資料
}

// **新增 updateItem 函式**
async function updateItem(id) {
    let newName = prompt("請輸入新的資料名稱：");
    if (!newName || newName.trim() === "") {
        alert("名稱不可為空！");
        return;
    }
    
    let newPhone = prompt("請輸入新的電話號碼：");
    if (!newPhone || newPhone.trim() === "") {
        alert("電話不可為空！");
        return;
    }

    newName = newName.trim(); // 移除前後空格
    newPhone = newPhone.trim();

    console.log("更新資料 ID:", id, "新名稱:", newName, "新電話:", newPhone);
    console.log("發送請求的 JSON:", JSON.stringify({ name: newName, phone: newPhone }));

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, phone: newPhone }) // 確保發送的是正確的字串
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        console.error("更新失敗：", errorMessage);
        alert("更新失敗：" + errorMessage.message);
        return;
    }

    fetchItems(); // 重新載入資料
}

// 關鍵字搜尋
async function searchItems() {
    const keyword = document.getElementById("searchInput").value; // 取得搜尋輸入框的值
    const res = await fetch(`${API_URL}/search?keyword=${keyword}`); // 向 API 發送搜尋請求
    const items = await res.json(); // 轉換回傳的 JSON
    renderItems(items); // 更新 UI 顯示搜尋結果
}

// 初始化畫面時，獲取資料
fetchItems();
