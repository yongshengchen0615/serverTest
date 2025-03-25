import { scratchOptions } from '../data/scratchOptions.js';

/**
 * 根據 targetName 陣列，顯示對應按鈕
 * @param {string[]} showList - 例如 ['points5', 'birthdayTheme']
 */
export function renderButtons(showList = []) {
  const container = document.getElementById("buttonContainer");
  container.innerHTML = "";

  const filtered = scratchOptions.filter(item => showList.includes(item.targetName));

  filtered.forEach((item) => {
    const a = document.createElement("a");
    a.href = `../prototype/index.html?title=${item.title}&theme=${item.theme}&targetName=${item.targetName}`;
    a.textContent = item.label;
    a.id = `btn-${item.targetName}`;

    a.className = `
      button
      bg-orange-400 text-white text-xl sm:text-2xl
      rounded-2xl py-4 px-6 shadow text-center
      pointer-events-none opacity-50
      transition-all duration-200 hover:scale-105
    `;

    container.appendChild(a);
  });
}
