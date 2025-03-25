import { getRandomPrize } from "./utils.js";

let canvas, ctx;
let isScratching = false;
let isRevealed = false; // 控制是否已顯示獎品
let centerRevealed = false; // 是否刮開正中央

export function setupScratchCard() {
    let selectedPrize = getRandomPrize();
    document.getElementById("prize").innerText = selectedPrize;

    canvas = document.getElementById("scratchCanvas");
    ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#bbb"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";

    isRevealed = false;
    centerRevealed = false; // 重置狀態

    canvas.style.opacity = "1"; // 確保新的刮刮卡可見
    canvas.style.display = "block";

    // **電腦事件**
    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopScratch);
    canvas.addEventListener("mouseleave", stopScratch);

// **手機觸控事件（修改後）**
canvas.addEventListener("touchstart", startScratch, { passive: false });
canvas.addEventListener("touchmove", scratchTouch, { passive: false });
canvas.addEventListener("touchend", stopScratch);
}

// 開始刮刮樂
function startScratch() {
    isScratching = true;
}

// 停止刮刮樂
function stopScratch() {
    isScratching = false;
}

// **電腦版 - 刮刮樂效果**
function scratch(event) {
    if (!isScratching || isRevealed) return;
    let { x, y } = getMousePos(event);
    eraseCanvas(x, y);
}

// **手機版 - 刮刮樂效果**
function scratchTouch(event) {
    if (!isScratching || isRevealed) return;

    event.preventDefault(); // ⭐️ 阻止畫面滑動

    let touch = event.touches[0];
    let { x, y } = getTouchPos(touch);
    eraseCanvas(x, y);
}

// **獲取滑鼠位置**
function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// **獲取觸控位置**
function getTouchPos(touch) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// **刮除畫布**
function eraseCanvas(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    checkScratchPercentage(x, y);
}

// **檢查刮開的面積與是否刮開中央**
function checkScratchPercentage(x, y) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;
    let clearedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) clearedPixels++; // 計算透明像素數量
    }

    let percentage = (clearedPixels / (canvas.width * canvas.height)) * 100;

    // **檢查是否刮開中央區域**
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    
    if (distance < 30) {
        centerRevealed = true;
    }

    if (percentage > 50 && percentage < 90) {
        // 50% 以上時，漸淡 canvas
        canvas.style.transition = "opacity 0.8s";
        canvas.style.opacity = "0.8";
    }

    if ((percentage >= 90 || centerRevealed) && !isRevealed) {
        revealPrize();
    }
}

// **當刮開超過 90% 或刮開正中央時，顯示獎品**
function revealPrize() {
    isRevealed = true;
    document.getElementById("prize").classList.add("animate__animated", "animate__wobble");

    canvas.style.transition = "opacity 0.5s";
    canvas.style.opacity = "0";

    setTimeout(() => {
        canvas.style.display = "none";
    }, 500);
}
