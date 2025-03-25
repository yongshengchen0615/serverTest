// locationModule.js

export const storeLat = 22.98937130018531;
export const storeLon = 120.20552318947942;
export const allowedDistance = 2; // 公里

// 計算距離（哈弗賽公式）
export function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// 顯示訊息 + 顏色
export function setMessage(text, color = "red") {
  const el = document.getElementById("message");
  el.innerText = text;

  // 清除前一次動畫，重新觸發 animate__fadeIn
  el.classList.remove("animate__fadeIn");
  void el.offsetWidth; // 強制 Reflow
  el.classList.add("animate__fadeIn");

  // 動態設置顏色
  if (color === "green") el.classList.add("text-green-600");
  else if (color === "orange") el.classList.add("text-orange-500");
  else el.classList.add("text-red-600");
}

export function enableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.remove("pointer-events-none", "opacity-50");
    btn.classList.add("cursor-pointer", "opacity-100");
  });
}

export function disableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.add("pointer-events-none", "opacity-50");
    btn.classList.remove("cursor-pointer", "opacity-100");
  });
}