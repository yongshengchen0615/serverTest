


//資料庫庫載入
export const prizePoolt = [
  
];

// 顯示獎品
export function displayPrizes(items) {
// ✅ 檢查是否有任何 item 擁有合法的 points20 陣列資料
const hasPoints20Data = items.some(
    item => Array.isArray(item.points20) && item.points20.length >= 2
);

if (hasPoints20Data) {
    // ✅ 建立獎品池資料
    items.forEach(item => {
        if (Array.isArray(item.points20) && item.points20.length >= 2) {
            prizePoolt.push({
                id: item.id,
                name: item.name,
                probability: Number(item.points20[1]),     // 機率
                sortOrder: Number(item.points20[0])        // 排序
            });
        }
    });

    // ✅ 顯示獎品列表到畫面上（依照排序排序後顯示）
    let prizeList = document.getElementById("prizes");
    prizeList.innerHTML = "";

    // ✅ 排序後再顯示
    prizePoolt.sort((a, b) => a.sortOrder - b.sortOrder);

    prizePoolt.forEach(prize => {
        let li = document.createElement("li");
        li.innerText = `🔸 ${prize.name} ===== ${prize.probability}%`;
        prizeList.appendChild(li);
    });
}
}
