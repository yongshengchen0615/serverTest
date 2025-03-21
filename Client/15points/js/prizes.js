
//資料庫庫載入
export const prizePoolt = [
  
];

// 顯示獎品
export function displayPrizes(items) {
// ✅ 轉換並過濾 id 開頭為 5 的資料
    items
    .filter(item => item.id.startsWith("15"))
    .forEach(item => {
        prizePoolt.push({
          id: item.id,
          name: item.name,
          probability: Number(item.probability)
      });
  });
    let prizeList = document.getElementById("prizes");
    prizeList.innerHTML = "";
    prizePoolt.forEach(prize => {
        let li = document.createElement("li");
        li.innerText ="🔸  "+ prize.name+"====="+prize.probability+"%";
        prizeList.appendChild(li);
    });
}
