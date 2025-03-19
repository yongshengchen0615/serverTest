// 伺服器 API 的基礎 URL
const API_URL = "http://localhost:3000/api/items";

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
            ${item.name}
            <div>
                <button onclick="updateItem('${item._id}')" class="bg-yellow-500 text-white px-2 py-1 mr-2">修改</button>
                <button onclick="deleteItem('${item._id}')" class="bg-red-500 text-white px-2 py-1">刪除</button>
            </div>
        `;
        itemList.appendChild(li); // 將 <li> 加入列表
    });
}

// 新增資料
async function addItem() {
    const newItem = document.getElementById("newItem").value; // 取得輸入框的值
    if (!newItem) return alert("請輸入資料"); // 檢查是否為空

    await fetch(API_URL, {
        method: "POST", // 使用 POST 方法新增資料
        headers: { "Content-Type": "application/json" }, // 指定資料格式
        body: JSON.stringify({ name: newItem }) // 傳遞資料
    });

    document.getElementById("newItem").value = ""; // 清空輸入框
    fetchItems(); // 重新獲取並渲染資料
}

// 刪除資料
async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // 透過 DELETE 請求刪除指定 ID 的資料
    fetchItems(); // 重新獲取並渲染資料
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
