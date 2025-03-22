<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'https://cdn.jsdelivr.net/npm/axios/+esm'
import Sortable from 'https://cdn.jsdelivr.net/npm/sortablejs/+esm'

const prizeData = ref([])
const sortableRefs = ref({})

// 載入資料
async function loadPrizeData() {
  try {
    const res = await axios.get('https://servertest-gvl6.onrender.com/api/prizePool')
    prizeData.value = res.data.map(item => ({
      ...item,
      prizeList: item.prize.map((p, index) => {
        const [order, name, rate] = p.split(';')
        return {
          _uid: `${item._id}-${index}-${Date.now()}-${Math.random()}`,
          order: Number(order),
          name,
          rate: Number(rate)
        }
      })
    }))
    await nextTick()
    initSortables()
  } catch (err) {
    alert('❌ 載入失敗：' + (err.response?.data?.message || err.message))
  }
}

// 拖曳初始化
function initSortables() {
  prizeData.value.forEach(item => {
    const el = sortableRefs.value[item._id]
    if (!el || el._sortable) return

    const sortable = new Sortable(el, {
      animation: 150,
      dataIdAttr: 'data-id',
      onEnd: async () => {
        const newOrderIds = sortable.toArray()
        const newList = newOrderIds.map(uid =>
          item.prizeList.find(p => String(p._uid) === uid)
        )
        item.prizeList = [...newList]
        item.prizeList.forEach((p, i) => {
          p.order = i + 1
        })
        await savePrize(item) // ✅ 拖曳後自動儲存
      }
    })
    el._sortable = sortable
  })
}

// 新增獎項
function addPrize(item) {
  item.prizeList.push({
    _uid: `${item._id}-${Date.now()}-${Math.random()}`,
    order: item.prizeList.length + 1,
    name: '',
    rate: 0
  })
  nextTick(() => initSortables())
}

// 刪除獎項
function deletePrize(item, prize) {
  item.prizeList = item.prizeList.filter(p => p._uid !== prize._uid)
  item.prizeList.forEach((p, i) => p.order = i + 1)
  nextTick(() => initSortables())
}

// 儲存 API
async function savePrize(item) {
  const payload = {
    name: item.name,
    prize: item.prizeList.map(p => `${p.order};${p.name};${p.rate}`)
  }
  try {
    await axios.put(`https://servertest-gvl6.onrender.com/api/prizePool/${item._id}`, payload)
    console.log('✅ 自動儲存成功：', item.name)
  } catch (err) {
    alert('❌ 儲存失敗：' + (err.response?.data?.message || err.message))
  }
}

onMounted(loadPrizeData)
</script>

<template>
  <div v-for="item in prizeData" :key="item._id" class="bg-white rounded shadow-md p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4">{{ item.name }}（ID: {{ item.id }}）</h2>

    <button @click="addPrize(item)" class="mb-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
      ➕ 新增獎項
    </button>

    <div class="overflow-x-auto">
      <table class="w-full table-auto border border-gray-300 text-left text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 border">排序</th>
            <th class="p-2 border">獎項名稱</th>
            <th class="p-2 border">中獎機率</th>
            <th class="p-2 border w-12">刪除</th>
          </tr>
        </thead>
        <tbody :ref="el => sortableRefs.value[item._id] = el">
          <tr v-for="prize in item.prizeList" :key="prize._uid" :data-id="prize._uid" class="hover:bg-gray-50">
            <td class="p-2 border">{{ prize.order }}</td>
            <td class="p-2 border"><input v-model="prize.name" class="w-full border rounded p-1" /></td>
            <td class="p-2 border"><input v-model.number="prize.rate" type="number" class="w-full border rounded p-1" /></td>
            <td class="p-2 border text-center">
              <button @click="deletePrize(item, prize)" class="text-red-500 hover:text-red-700">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
