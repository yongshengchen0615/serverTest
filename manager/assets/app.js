// prize-admin/assets/app.js

// ✅ 設定 API 網址（請換成你的後端網址）
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
    /**
     * 載入獎項資料
     */
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

        await nextTick();
        this.initSortables();
      } catch (err) {
        console.error('載入失敗', err);
        alert("❌ 載入失敗：" + (err.response?.data?.message || err.message || '未知錯誤'));
      }
    },

    /**
     * 初始化每個獎項的拖拉排序功能
     */
    initSortables() {
      this.prizeData.forEach(item => {
        const el = this.$refs['sortable-' + item._id]?.[0]; // ✅ 修正為單一 HTMLElement

        if (!el || el._sortable) return;

        const sortable = new Sortable(el, {
          animation: 150,
          onEnd: (evt) => {
            const movedItem = item.prizeList.splice(evt.oldIndex, 1)[0];
            item.prizeList.splice(evt.newIndex, 0, movedItem);

            // 重新設定排序順序
            item.prizeList.forEach((p, i) => {
              p.order = i + 1;
            });
          }
        });

        el._sortable = sortable; // 防止重複綁定
      });
    },

    /**
     * 儲存獎項資料
     */
    async savePrize(item) {
      const updatedPrize = item.prizeList.map(p => `${p.order};${p.name};${p.rate}`);
  const payload = {
    name: item.name,
    prize: updatedPrize
  };

  try {
    await axios.put(`/api/prizePool/${item._id}`, payload); // ✅ 改為帶上 _id
    alert("✅ 儲存成功！");
  } catch (err) {
    console.error('儲存錯誤', err);
    alert("❌ 儲存失敗：" + (err.response?.data?.message || err.message || '未知錯誤'));
  }
    }
  }
}).mount('#app');
