// 店家 GPS 經緯度
const storeLat = 22.989400929173414;
const storeLon = 120.20560902221429;
const allowedDistance = 0.3; // 公里

// 啟動檢查定位
checkLocation();

function checkLocation() {
    disableButtons();
    setMessage("📍 正在追蹤您的位置...", "orange");
  
    if (!navigator.geolocation) {
      setMessage("❌ 您的瀏覽器不支援定位功能", "red");
      return;
    }
  
    navigator.geolocation.watchPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
  
        console.log(`🛰️ 使用者位置更新：${userLat}, ${userLon}`);
  
        const distance = getDistanceFromLatLon(userLat, userLon, storeLat, storeLon);
  
        if (distance <= allowedDistance) {
          setMessage("✅ 位置確認成功！您可以參加刮刮樂！", "green");
          enableButtons();
        } else {
          setMessage(`❌ 位置不符，請到店內參加！（距離約 ${distance.toFixed(2)} 公里）`, "red");
          disableButtons(); // 若離開區域就關閉按鈕
        }
      },
      (error) => {
        console.error("定位錯誤：" + error.message);
        let msg = "❌ 無法取得定位，請開啟定位功能";
        if (error.code === 1) msg = "❌ 您拒絕了定位權限";
        else if (error.code === 2) msg = "❌ 無法取得定位資訊";
        else if (error.code === 3) msg = "❌ 定位逾時";
  
        setMessage(msg, "red");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
}

function enableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.add("enabled");
  });
}

function disableButtons() {
  document.querySelectorAll(".button").forEach((btn) => {
    btn.classList.remove("enabled");
  });
}

// 顯示訊息 + 色彩樣式
function setMessage(text, color = "red") {
  const el = document.getElementById("message");
  el.innerText = text;
  if (color === "green") el.style.color = "#28a745";
  else if (color === "orange") el.style.color = "#ff8800";
  else el.style.color = "#d9534f"; // default red
}

// 哈弗賽公式
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
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
