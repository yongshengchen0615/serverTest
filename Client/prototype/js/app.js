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

const api = new APIService("https://servertest-r18o.onrender.com/api");

function getQueryParams() {
  const url = new URL(window.location.href);
  return Object.fromEntries(url.searchParams.entries());
}
createApp({
  setup() {
    const isLoading = ref(true);
    const isScratching = ref(false);

    // ✅ 改為固定參數，不再從網址取得
    const titleText = ref("🎉 5點刮刮樂 🎉");
    const theme = ref("default");
    const params = getQueryParams();
    const itemId = params.itemId || "67dd44799177db210a18ff5a"; // 可給預設 fallback

    // ✅ 主題樣式與各組件樣式設定
    const currentTheme = computed(() => themeStyles[theme.value] || themeStyles.default);
    const backgroundClass = computed(() => currentTheme.value.background);

    const titleClass = computed(() => {
      const themeValue = currentTheme.value;
      return `${themeValue.title} ${themeValue.animations?.title || ""}`;
    });

    const cardClass = computed(() => `${currentTheme.value.card} ${currentTheme.value.animations.card}`);
    const prizeListClass = computed(() => `${currentTheme.value.prizeList} ${currentTheme.value.animations.prizeList}`);
    const hintClass = computed(() => `${currentTheme.value.hint} ${currentTheme.value.animations.hint}`);
    const scratchCardClass = computed(() => `${currentTheme.value.scratchCard} ${currentTheme.value.animations.scratchCard}`);
    const scratchCanvasClass = computed(() => currentTheme.value.scratchCanvas);

    const backButtonBase = computed(() => currentTheme.value.backButtonBase);
    const backButtonHover = computed(() => currentTheme.value.backButtonHover);
    const backButtonAnimate = computed(() => currentTheme.value.backButtonAnimate);
    const backButtonClass = computed(() => `${backButtonBase.value} ${backButtonHover.value}`);

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
        // ✅ 改為寫死搜尋參數
        const items = await api.searchItems(itemId);
        displayPrizes(items);
        // ✅ 正確指定 ref 的值
        titleText.value = items.titleText || "🎉 5點刮刮樂 🎉";
        theme.value = items.style || "default";

        document.title = titleText.value;

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
