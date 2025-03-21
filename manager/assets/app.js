// prize-admin/assets/app.js

// 設定 API 基本路徑（替換為你的後端網址）
axios.defaults.baseURL = 'https://servertest-gvl6.onrender.com';

const { createApp, nextTick } = Vue;

createApp({
  data() {
    return {
      prizeData: []
    };
  },
  mounted() {
    this.loadPrizeData();
  },
  methods: {
    // 讀取獎項資料並轉換 prizeList 格式
    async loadPrizeData() {
      try {
        const res = await axios.get('/api/prizePool');
        this.prizeData = res.data.map(item => ({
          ...item,
          prizeList: item.prize.map(p => {
            const [order, name, rate] = p.split(';');
            return {
              order: Number(order),
              name,
              rate: Number(rate)
            };
          })
        }));

        // 等畫面渲染完後，啟用拖曳功能
        await nextTick();
        this.initSortables();

      } catch (err) {
        alert("❌ 載入失敗：" + err.message);
      }
    },

    // 對每一組獎項啟用拖拉排序功能
    initSortables() {
      this.prizeData.forEach(item => {
        const el = this.$refs['sortable-' + item._id];
        if (!el || el._sortable) return; // 避免重複掛載

        const sortable = new Sortable(el, {
          animation: 150,
          onEnd: (evt) => {
            const movedItem = item.prizeList.splice(evt.oldIndex, 1)[0];
            item.prizeList.splice(evt.newIndex, 0, movedItem);

            // 更新排序號碼
            item.prizeList.forEach((p, index) => {
              p.order = index + 1;
            });
          }
        });

        // 標記避免重複掛載
        el._sortable = sortable;
      });
    },

    // 儲存單筆獎項資料
    async savePrize(item) {
      const updatedPrize = item.prizeList.map(p => `${p.order};${p.name};${p.rate}`);
      const payload = {
        id: item.id,
        name: item.name,
        prize: updatedPrize
      };
      try {
        await axios.put(`/api/prizePool/${item._id}`, payload);
        alert("✅ 儲存成功！");
      } catch (err) {
        alert("❌ 儲存失敗：" + err.message);
      }
    }
  }
}).mount('#app');
