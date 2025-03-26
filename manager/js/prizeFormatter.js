// js/prizeFormatter.js
import { generateUid } from './utils.js';

export function formatPrizeData(apiData) {
  return apiData.map(pool => {
    const prizeList = pool.prize.map((str, index) => {
      const [order, name, rate] = str.split(";");
      return {
        _uid: generateUid(pool._id + index),
        order: Number(order),
        name,
        rate: Number(rate)
      };
    });

    return {
      _id: pool._id,
      name: pool.name,
      style: pool.style || 'default',
      titleText: pool.titleText || '',
      prizeList,
      originalPrize: JSON.stringify(prizeList),
      modified: false
    };
  });
}


export function checkModified(item) {
  const currentPrize = JSON.stringify(item.prizeList);
  const isPrizeChanged = currentPrize !== item.originalPrize;
  const isStyleChanged = item.style !== (item.originalStyle || 'default');
  const isTitleChanged = item.titleText !== (item.originalTitleText || '');

  item.modified = isPrizeChanged || isStyleChanged || isTitleChanged;
}
