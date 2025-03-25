// js/app.js
import { displayPrizes } from "./prizes.js";
import { setupScratchCard } from "./scratch_card.js";
import APIService from "./APIService.js";
import { themeStyles } from "./themeStyles.js";

import {
  createApp,
  ref,
  computed,
  onMounted,
} from "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js";

// ✅ 取得網址參數
function getQueryParams() {
  const url = new URL(window.location.href);
  return Object.fromEntries(url.searchParams.entries());
}

const api = new APIService("https://servertest-r18o.onrender.com/api");

createApp({
  setup() {
    const isLoading = ref(true);
    const isScratching = ref(false); // ✅ 動畫控制

    const params = getQueryParams();
    const titleText = ref(params.title || "🎉 5點刮刮樂 🎉");
    const theme = ref(params.theme || "default");
    const prizeName = params.targetName || "points5";

    // ✅ 設定網頁標題
    document.title = titleText.value;

    // ✅ 取得主題樣式
    const currentTheme = computed(() => themeStyles[theme.value] || themeStyles.default);

    // ✅ 背景樣式
    const backgroundClass = computed(() => currentTheme.value.background);

    // ✅ 各部分樣式
    const titleClass = computed(() => {
      const themeValue = currentTheme.value;
      return `${themeValue.title} ${themeValue.animations?.title || ""}`;
    });
    
    const cardClass = computed(() => `${currentTheme.value.card} ${currentTheme.value.animations.card}`);
    const prizeListClass = computed(() => `${currentTheme.value.prizeList} ${currentTheme.value.animations.prizeList}`);
    const hintClass = computed(() => `${currentTheme.value.hint} ${currentTheme.value.animations.hint}`);
    const scratchCardClass = computed(() => `${currentTheme.value.scratchCard} ${currentTheme.value.animations.scratchCard}`);
    const scratchCanvasClass = computed(() => currentTheme.value.scratchCanvas);
    

    // ✅ 返回按鈕樣式組合
    const backButtonBase = computed(() => currentTheme.value.backButtonBase);
    const backButtonHover = computed(() => currentTheme.value.backButtonHover);
    const backButtonAnimate = computed(() => currentTheme.value.backButtonAnimate);
    const backButtonClass = computed(() => `${backButtonBase.value} ${backButtonHover.value}`);

    // ✅ 切換主題
    function changeTheme(newTheme) {
      if (themeStyles[newTheme]) {
        theme.value = newTheme;
      }
    }

    function hideLoadingScreen() {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) loadingScreen.style.display = "none";
    }

    async function loadItems() {
      try {
        const items = await api.fetchItems();
        displayPrizes(items, prizeName);
        setupScratchCard();
        hideLoadingScreen();
        isLoading.value = false;
      } catch (error) {
        console.error("❌ 取得 API 資料失敗：", error);
      }
    }

    onMounted(() => {
      loadItems();
    });

    return {
      isLoading,
      isScratching,
      titleText,
      theme,
      titleClass,
      cardClass,
      hintClass,
      prizeListClass,
      scratchCardClass,
      scratchCanvasClass,
      backButtonClass,
      backButtonAnimate,
      backgroundClass,
      changeTheme,
    };
  },
}).mount("#app");
