// main.js
import {
    storeLat,
    storeLon,
    allowedDistance,
    getDistanceFromLatLon,
    setMessage,
    enableButtons,
    disableButtons
  } from './locationModule.js';
  
  // 啟動追蹤定位
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
          disableButtons();
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
  