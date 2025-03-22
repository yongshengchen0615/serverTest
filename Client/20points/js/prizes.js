// 資料庫載入
export const prizePoolt = [];

/**
 * 顯示獎品資料
 * @param {Array} items - 載入的獎品資料陣列
 */
export function displayPrizes(items) {
   // 清空原始獎池
   prizePoolt.length = 0;

   // 篩選並處理每筆資料
   items.forEach(item => {
       // ✅ 僅處理 name 為 "points20" 的項目
       if (item.name === "points20" && Array.isArray(item.prize)) {
           item.prize.forEach(prizeStr => {
               // 使用分號分割字串
               const [order, name, probability] = prizeStr.split(";");

               // 檢查資料格式是否正確
               if (order && name && probability) {
                   prizePoolt.push({
                       id: item.id,
                       name: name.trim(),
                       probability: Number(probability),
                       sortOrder: Number(order)
                   });
               }
           });
       }
   });

   // ✅ 排序後顯示
   prizePoolt.sort((a, b) => a.sortOrder - b.sortOrder);

   // 找到 HTML 中獎品顯示區塊
   const prizeList = document.getElementById("prizes");
   prizeList.innerHTML = "";

   // 動態產出清單
   prizePoolt.forEach(prize => {
       const li = document.createElement("li");
       li.innerText = `🔸 ${prize.name} ===== ${prize.probability}%`;
       prizeList.appendChild(li);
   });
}
