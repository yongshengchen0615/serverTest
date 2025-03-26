// locationModule.js

// 店家經緯度（可依需求修改）
export const storeLat = 22.98937130018531;
export const storeLon = 120.20552318947942;

// 容許距離（公里）→ 0.1 = 100 公尺
export const allowedDistance = 0.3;

/**
 * 計算兩點之間的距離（單位：公里，精準到公尺）
 * 使用 Haversine Formula（哈弗賽公式）
 * @param {number} lat1 使用者緯度
 * @param {number} lon1 使用者經度
 * @param {number} lat2 店家緯度
 * @param {number} lon2 店家經度
 * @returns {number} 距離（公里），小數第 3 位
 */
export function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 公尺
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInMeters = R * c;
  return distanceInMeters / 1000; // ✅ 回傳「數字」（公里）
}
// 弧度轉換
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * 顯示訊息（含動畫與動態文字顏色）
 * @param {string} text 要顯示的文字
 * @param {string} color red / green / orange
 */
export function setMessage(text, color = "red") {
  const el = document.getElementById("message");
  el.innerText = text;

  // 重啟動畫效果
  el.classList.remove("animate__fadeIn");
  void el.offsetWidth; // 強制 Reflow
  el.classList.add("animate__fadeIn");

  // 動態設置顏色
  el.classList.remove("text-green-600", "text-orange-500", "text-red-600");
  if (color === "green") el.classList.add("text-green-600");
  else if (color === "orange") el.classList.add("text-orange-500");
  else el.classList.add("text-red-600");
}

/**
 * 啟用所有按鈕
 */
export function enableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.remove("pointer-events-none", "opacity-50");
    btn.classList.add("cursor-pointer", "opacity-100");
  });
}

/**
 * 停用所有按鈕
 */
export function disableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.add("pointer-events-none", "opacity-50");
    btn.classList.remove("cursor-pointer", "opacity-100");
  });
}
