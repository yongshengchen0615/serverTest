// js/prizeFormatter.js
import { generateUid } from './utils.js';

export function formatPrizeData(apiData) {
  return apiData.map(item => {
    const prizeList = item.prize.map((p, index) => {
      const [order, name, rate] = p.split(";");
      return {
        _uid: generateUid(item._id, index),
        order: Number(order),
        name,
        rate: Number(rate)
      };
    });

    return {
      ...item,
      prizeList,
      originalPrize: JSON.stringify(prizeList),
      modified: false
    };
  });
}

export function checkModified(item) {
  const current = JSON.stringify(item.prizeList);
  item.modified = current !== item.originalPrize;
}
