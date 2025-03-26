// js/utils.js
export function generateUid(base, index = '') {
    return `${base}-${index}-${Date.now()}-${Math.random()}`;
  }
  