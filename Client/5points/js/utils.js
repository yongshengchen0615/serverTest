import { prizePoolt } from "./prizes.js";

export function getRandomPrize() {
    // ✅ 過濾掉 0% 機率的獎項
    const filteredPool = prizePoolt.filter(prize => Number(prize.probability) > 0);

    let randomNum = Math.random() * 100;
    let cumulativeProbability = 0;

    for (let i = 0; i < filteredPool.length; i++) {
        cumulativeProbability += filteredPool[i].probability;
        console.log(filteredPool[i].name);
        if (randomNum < cumulativeProbability) {
            return filteredPool[i].name;
        }
    }

    // ✅ 若沒中，回傳最後一個有效獎項的名稱，或防呆回傳 null
    return filteredPool[filteredPool.length - 1]?.name ?? null;
}
