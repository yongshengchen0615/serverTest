import { displayPrizes } from "./prizes.js";
import { setupScratchCard } from "./scratch_card.js";
import APIService from "./APIService.js";
import {
  createApp,
  ref,
  computed,
  onMounted,
} from "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js"; // ⚠ 建議改 jsDelivr，unpkg 有時會失效

// ✅ 工具函式：取得網址參數
function getQueryParams() {
  const url = new URL(window.location.href);
  return Object.fromEntries(url.searchParams.entries());
}

// ✅ 初始化 API 服務
const api = new APIService("https://servertest-gvl6.onrender.com/api");

createApp({
  setup() {
    const isLoading = ref(true); // 控制載入狀態
    const params = getQueryParams(); // 取得網址參數
    // ✅ 綁定變數
    const titleText = ref(params.title || "🎉 5點刮刮樂 🎉");
    const theme = ref(params.theme || "dark");

    // ✅ 套用瀏覽器 <title>
    document.title = titleText.value;

    // ✅ 樣式主題
    const themes = {
      default: {
        title: "text-pink-600 animate__bounceInDown",
        card: "bg-white/80 border-yellow-300 animate__fadeInDown text-gray-900",
      },
      festival: {
        title: "text-red-500 animate__heartBeat",
        card: "bg-pink-100 border-red-400 animate__fadeInRight text-red-900",
      },
      dark: {
        title: "text-white animate__zoomIn",
        card: "bg-gray-800 border-gray-600 animate__fadeInUp text-white",
      },
    };

    // ✅ 綁定樣式 class
    const titleClass = computed(() => themes[theme.value]?.title || "");
    const cardClass = computed(() => themes[theme.value]?.card || "");

    // ✅ 主題切換方法
    function changeTheme(newTheme) {
      if (themes[newTheme]) {
        theme.value = newTheme;
      }
    }

    // ✅ 隱藏 loading 畫面
    function hideLoadingScreen() {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) loadingScreen.style.display = "none";
    }

    // ✅ 載入 API 資料
    async function loadItems() {
      try {
        const items = await api.fetchItems();
        displayPrizes(items, params.targetName || "points5");
        setupScratchCard();
        hideLoadingScreen();
        isLoading.value = false;
      } catch (error) {
        console.error("❌ 取得 API 資料時發生錯誤:", error);
      }
    }

    onMounted(() => {
      loadItems();
    });

    return {
      isLoading,
      titleText,
      titleClass,
      cardClass,
      changeTheme,
      theme,
      
    };
  },
}).mount("#app");
