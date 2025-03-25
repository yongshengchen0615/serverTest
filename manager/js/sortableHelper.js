// js/sortableHelper.js
import Sortable from 'https://esm.sh/sortablejs@1.15.2';
import { checkModified } from "./prizeFormatter.js";

export function initSortables(prizeData, sortableRefs) {
  prizeData.forEach(item => {
    const el = sortableRefs[item._id];
    if (!el || el._sortable) return;

    const sortable = new Sortable(el, {
      animation: 150,
      dataIdAttr: 'data-id',
      onEnd: () => {
        const newOrder = sortable.toArray();
        const newList = newOrder.map(uid =>
          item.prizeList.find(p => String(p._uid) === uid)
        );
        item.prizeList = [...newList];
        item.prizeList.forEach((p, i) => {
          p.order = i + 1;
        });
        checkModified(item);
      }
    });

    el._sortable = sortable;
  });
}
