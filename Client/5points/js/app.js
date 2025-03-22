import { displayPrizes } from "./prizes.js";
import { setupScratchCard } from "./scratch_card.js";
import APIService from "./APIService.js";
import { createApp, ref, onMounted } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

// ✅ 初始化 API 服務
const api = new APIService("https://servertest-gvl6.onrender.com/api");

createApp({
    setup() {
        const isLoading = ref(true); // 控制 Vue 內部的載入狀態（若未來要用 v-if）

        // ✅ 關閉載入畫面
        function hideLoadingScreen() {
            const loadingScreen = document.getElementById("loading-screen");
            if (loadingScreen) {
                loadingScreen.style.display = "none";
            }
        }

        // ✅ 取得資料並初始化畫面
        async function loadItems() {
            try {
                const items = await api.fetchItems();
                displayPrizes(items); // 建議傳入資料
                setupScratchCard();
                hideLoadingScreen();       // ✅ 這裡才關閉載入畫面
                isLoading.value = false;   // 可提供 Vue 控制 v-if 使用
            } catch (error) {
                console.error("❌ 取得 API 資料時發生錯誤:", error);
            } finally {
            }
        }

        // ✅ 畫面掛載完成後執行
        onMounted(() => {
            loadItems(); // ✅ 正確執行順序：先載入資料，再關閉 loading
        });

        return {
            isLoading
        };
    }
}).mount("#app");
