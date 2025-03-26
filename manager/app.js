// ✅ 使用 CDN 模組版本導入
import { createApp, ref, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import axios from 'https://esm.sh/axios@1.6.8';

// ✅ 匯入模組功能
import { initSortables } from './js/sortableHelper.js';
import { formatPrizeData, checkModified } from './js/prizeFormatter.js';
import { generateUid } from './js/utils.js';

// ✅ Vue App 建立
createApp({
  setup() {
    const prizeData = ref([]);                // 獎項資料
    const sortableRefs = ref({});             // DOM 對應的 sortable 元素對應

    // ✅ 載入獎項資料並初始化排序
    async function loadPrizeData() {
      try {
        const res = await axios.get("https://servertest-r18o.onrender.com/api/prizePool");
        prizeData.value = formatPrizeData(res.data);
        await nextTick();
        initSortables(prizeData.value, sortableRefs.value);
      } catch (err) {
        console.error("⚠️ 錯誤詳細：", err);
        alert("❌ 載入失敗：" + (err.response?.data?.message || err.message));
      }
    }

    // ✅ 新增獎項
    function addPrize(item) {
      item.prizeList.push({
        _uid: generateUid(item._id),
        order: item.prizeList.length + 1,
        name: '',
        rate: 0
      });
      nextTick(() => {
        initSortables(prizeData.value, sortableRefs.value);
        checkModified(item);
      });
    }

    // ✅ 刪除指定獎項
    function deletePrize(item, prize) {
      item.prizeList = item.prizeList.filter(p => p._uid !== prize._uid);
      item.prizeList.forEach((p, i) => p.order = i + 1);
      nextTick(() => {
        initSortables(prizeData.value, sortableRefs.value);
        checkModified(item);
      });
    }

    // ✅ 儲存目前獎項設定
    async function savePrize(item) {
      const payload = {
        name: item.name,
        style: item.style,
        titleText: item.titleText,
        prize: item.prizeList.map(p => `${p.order};${p.name};${p.rate}`)
      };
    
      try {
        await axios.put(`https://servertest-r18o.onrender.com/api/prizePool/${item._id}`, payload);
        console.log("✅ 儲存成功：", item.name);
        item.originalPrize = JSON.stringify(item.prizeList);
        item.originalStyle = item.style;
        item.originalTitleText = item.titleText;
        item.modified = false;
      } catch (err) {
        alert("❌ 儲存失敗：" + (err.response?.data?.message || err.message));
      }
    }

    async function createPrizePool() {
      const newPool = {
        id: generateUid("pool"), // 👈 補這行給 mongoose 用的 `id`
        name: generateUid("newPrize"),
        titleText: "未命名獎池", // 👈 不要空字串，補上預設文字
        style: "default",
        prize: []
      };
    
      try {
        const res = await axios.post("https://servertest-r18o.onrender.com/api/prizePool", newPool);
    
        // 使用 formatPrizeData 包裝成 Vue 需要的格式
        const formatted = formatPrizeData([res.data])[0];
        prizeData.value.unshift(formatted); // 插入最前面
    
        console.log("✅ 新增成功", res.data);
      } catch (err) {
        console.error("❌ 新增失敗：", err.response?.data); // ← 看 error.message
        console.error("❌ 新增獎池失敗", err);
        alert("❌ 新增失敗：" + (err.response?.data?.message || err.message));
      }
    }

    // ✅ 頁面初始化載入
    loadPrizeData();

    // ✅ 返回給 template 使用的資料與函式
    return {
      prizeData,
      sortableRefs,
      addPrize,
      deletePrize,
      savePrize,
      createPrizePool,  // 🆕 新增這行
      checkModified,
      setRef: (id, el) => el && (sortableRefs.value[id] = el) // 綁定 DOM ref 給 sortable 使用
    };
  }
  
}).mount("#app");