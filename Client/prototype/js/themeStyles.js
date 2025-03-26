// assets/themeStyles.js

export const themeStyles = {
  // 🧁 預設主題 點數刮刮樂用
  default: {
    // 🟦 背景樣式（將套用在外層容器）
    background: "bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100",

    // 🎉 標題文字
    title: "font-baloo text-3xl sm:text-4xl md:text-5xl text-pink-600 font-extrabold mb-3 drop-shadow-md",

    // 🧊 卡片容器（外框）
    card: "bg-white/30 border-yellow-300 text-gray-900 w-full max-w-md mx-auto mt-0",

    // 📢 小提示
    hint: "mt-3 text-pink-500 font-bold",

    // 🏆 獎品清單區塊
    prizeList: "bg-yellow-100 border-2 border-yellow-500 p-4 rounded-2xl mt-5 shadow-inner text-left",

    // 🎰 刮刮卡樣式
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-white text-2xl font-bold rounded-2xl shadow-lg bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-yellow-500 relative",

    // 🎨 Canvas 覆蓋層
    scratchCanvas: "absolute top-0 left-0 rounded-2xl shadow-md cursor-pointer",

    // ⬅️ 返回按鈕樣式：基礎樣式
    backButtonBase: "fixed bottom-1 left-4 bg-pink-500 text-white font-bold py-2 px-5 rounded-full shadow-lg transition-all duration-300 transform",

    // ⬅️ 返回按鈕樣式：hover 效果
    backButtonHover: "hover:bg-pink-600 hover:scale-110",

    // ⬅️ 返回按鈕樣式：動畫（由 Vue 控制）
    backButtonAnimate: "animate__animated animate__headShake",

    // 🔄 進場動畫（由程式決定要不要用）
    animations: {
      title: "animate__animated animate__bounceInDown",
      card: "animate__animated animate__fadeInDown",
      prizeList: "animate__animated animate__fadeInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    },

  },
  //生日主題
  birthdayStyles: {
    // 🎨 背景：五彩氣球漸層
    background: "min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100",

    // 🎉 標題文字：糖果色＋動感字體
    title: "font-baloo text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 font-extrabold mb-6 drop-shadow-lg animate__animated animate__rubberBand text-center px-4",

    // 🧁 卡片容器：可愛蛋糕盒＋邊框糖霜感
    card: "bg-white/80 border-[3px] border-dashed border-pink-300 text-gray-900 w-full max-w-[90vw] sm:max-w-sm mx-auto mt-0 sm:mt-16 rounded-[30px] shadow-2xl backdrop-blur-md px-4 sm:px-8",

    // 📢 小提示文字：馬卡龍色大字
    hint: "mt-4 text-blue-500 font-extrabold text-base sm:text-lg text-center animate__animated animate__flash animate__infinite px-4",

    // 🎁 獎品清單區：糖果盒卡片
    prizeList: "bg-yellow-50 border-[3px] border-pink-400 p-4 sm:p-5 rounded-[24px] mt- shadow-inner text-left text-sm sm:text-base",

    // 🎰 刮刮卡樣式：彩虹蛋糕色＋立體邊框
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold rounded-[24px] shadow-2xl bg-gradient-to-br from-pink-300 via-yellow-300 to-purple-400 border-[5px] border-white relative",

    // 🎨 Canvas 覆蓋層：滑鼠互動用
    scratchCanvas: "absolute top-0 left-0 w-full h-full rounded-[24px] shadow-md cursor-pointer",

    // ⬅️ 返回按鈕：糖果圓形大按鈕
    backButtonBase: "fixed bottom-4 left-4 sm:left-2 sm:bottom-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 text-white font-bold py-2 px-6 sm:px-4 sm:py-1 rounded-full shadow-xl transition-all duration-300 transform border-2 border-white text-sm sm:text-base",

    // ⬅️ 返回按鈕 hover 效果
    backButtonHover: "hover:scale-125 hover:rotate-1 hover:brightness-110",

    // ⬅️ 返回按鈕動畫
    backButtonAnimate: "animate__animated animate__heartBeat",

    // 🔄 元素進場動畫
    animations: {
      title: "animate__animated animate__rubberBand",
      card: "animate__animated animate__fadeInUp",
      prizeList: "animate__animated animate__jackInTheBox",
      hint: "animate__animated animate__flash animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    }

  },
  // 🍀 幸運主題風格
  luckyStyles: {
    // 🟨 背景樣式（紅金漸層）
    background: "bg-gradient-to-br from-red-200 via-yellow-100 to-yellow-300 min-h-screen flex flex-col items-center",

    // 🧧 標題文字（紅字＋金陰影）
    title: "font-baloo text-4xl sm:text-5xl lg:text-6xl text-red-600 font-extrabold mb-3 drop-shadow-[2px_2px_0_gold] text-center",

    // 🎴 卡片容器（白底＋金邊＋透明感）
    card: "bg-white/80 border-2 border-yellow-500 rounded-xl shadow-xl w-[90%] sm:w-[80%] md:w-[600px] mx-auto mt-0 p-4",

    // 🧨 小提示（紅金字，閃動動畫）
    hint: "mt-3 text-red-600 font-bold text-base sm:text-lg animate__animated animate__flash animate__infinite",

    // 🎁 獎品清單區塊（金紅＋陰影）
    prizeList: "bg-yellow-50 border-2 border-red-400 p-4 rounded-2xl mt-5 shadow-inner text-left w-full",

    // 💳 刮刮卡樣式（紅金閃耀）
    scratchCard: "w-[300px] h-[150px] max-w-[300px] h-[150] flex items-center justify-center text-white text-2xl font-bold rounded-2xl shadow-lg bg-gradient-to-r from-red-400 via-yellow-300 to-red-500 border-4 border-yellow-500 mx-auto",


    // ✨ Canvas 覆蓋層
    scratchCanvas: "absolute top-0 left-0 w-full h-full rounded-2xl cursor-pointer",

    // ⬅️ 返回按鈕樣式：基礎（紅底金字）
    backButtonBase: "fixed bottom-2 left-4 bg-red-500 text-yellow-100 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform z-50",

    // ⬅️ 返回按鈕樣式：hover
    backButtonHover: "hover:bg-red-600 hover:scale-110",

    // ⬅️ 返回按鈕樣式：動畫
    backButtonAnimate: "animate__animated animate__tada",

    // 🔄 進場動畫
    animations: {
      title: "animate__animated animate__bounceIn",
      card: "animate__animated animate__fadeInUp",
      prizeList: "animate__animated animate__lightSpeedInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    },
  },
  //極簡冷色系（科技感）
  minimalCool: {
    background: "bg-gradient-to-br from-blue-200 via-white to-slate-100",
    title: "font-sans text-3xl sm:text-4xl md:text-5xl text-sky-700 font-extrabold tracking-wide mb-4",
    card: "bg-white/70 border border-sky-300 text-gray-800 w-full max-w-md mx-auto rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
    hint: "mt-3 text-sky-500 italic font-medium",
    prizeList: "bg-sky-50 border border-sky-300 p-4 rounded-xl mt-5 shadow-inner text-left list-none pl-0 space-y-2",
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-sky-900 text-2xl font-bold rounded-2xl shadow-inner bg-gradient-to-r from-sky-200 to-blue-300 border-4 border-sky-500 relative",
    scratchCanvas: "absolute top-0 left-0 rounded-2xl cursor-pointer",
    backButtonBase: "fixed bottom-2 left-4 bg-sky-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300",
    backButtonHover: "hover:bg-sky-700 hover:scale-105",
    backButtonAnimate: "animate__animated animate__fadeInUp",
    animations: {
      title: "animate__animated animate__fadeInDown",
      card: "animate__animated animate__fadeIn",
      prizeList: "animate__animated animate__fadeInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    }
  },
  //自然清新風
  natureFresh: {
    background: "bg-gradient-to-br from-green-100 via-lime-100 to-emerald-50",
    title: "font-serif text-3xl sm:text-4xl md:text-5xl text-emerald-700 font-bold mb-4",
    card: "bg-white/70 border border-emerald-300 text-emerald-900 w-full max-w-md mx-auto rounded-xl shadow-md",
    hint: "mt-3 text-lime-600 italic font-medium",
    prizeList: "bg-lime-50 border border-lime-300 p-4 rounded-2xl mt-5 shadow-inner text-left list-none pl-0 space-y-2",
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-emerald-800 text-2xl font-bold rounded-2xl shadow-inner bg-gradient-to-r from-lime-200 to-emerald-300 border-4 border-emerald-500 relative",
    scratchCanvas: "absolute top-0 left-0 rounded-2xl cursor-pointer",
    backButtonBase: "fixed bottom-2 left-4 bg-emerald-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300",
    backButtonHover: "hover:bg-emerald-600 hover:scale-105",
    backButtonAnimate: "animate__animated animate__bounceIn",
    animations: {
      title: "animate__animated animate__fadeInDown",
      card: "animate__animated animate__fadeIn",
      prizeList: "animate__animated animate__lightSpeedInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    }
  },
  //粉彩可愛風（馬卡龍）
  pastelCute: {
    background: "bg-gradient-to-br from-pink-100 via-rose-100 to-violet-200",
    title: "font-baloo text-3xl sm:text-4xl md:text-5xl text-pink-500 font-extrabold mb-4 drop-shadow",
    card: "bg-white/50 border border-pink-200 text-pink-800 w-full max-w-md mx-auto rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.08)]",
    hint: "mt-3 text-pink-400 italic font-semibold",
    prizeList: "bg-pink-50 border border-pink-300 p-4 rounded-2xl mt-5 shadow-inner text-left list-none pl-0 space-y-2",
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-pink-700 text-2xl font-bold rounded-2xl shadow-lg bg-gradient-to-r from-pink-200 to-yellow-200 border-4 border-pink-300 relative",
    scratchCanvas: "absolute top-0 left-0 rounded-2xl cursor-pointer",
    backButtonBase: "fixed bottom-2 left-4 bg-pink-400 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300",
    backButtonHover: "hover:bg-pink-500 hover:scale-110",
    backButtonAnimate: "animate__animated animate__headShake",
    animations: {
      title: "animate__animated animate__bounceInDown",
      card: "animate__animated animate__fadeInDown",
      prizeList: "animate__animated animate__fadeInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__zoomIn"
    }
  },

  
  //像素懷舊風（遊戲感）
  pixelRetro: {
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    title: "font-press-start text-xl sm:text-2xl md:text-3xl text-green-400 mb-4 tracking-widest",
    card: "bg-black/80 border-green-500 text-green-300 w-full max-w-md mx-auto border-2",
    hint: "mt-3 text-lime-300 font-mono text-sm",
    prizeList: "bg-gray-900 border-2 border-lime-400 p-4 rounded-lg mt-5 shadow-inner font-mono text-green-300 text-left list-none pl-0 space-y-2",
    scratchCard: "w-[300px] h-[150px] flex items-center justify-center text-lime-300 text-lg font-bold rounded-md shadow-xl bg-gradient-to-r from-gray-700 to-gray-900 border-2 border-green-500 relative",
    scratchCanvas: "absolute top-0 left-0 rounded-md cursor-pointer",
    backButtonBase: "fixed bottom-1 left-4 bg-green-600 text-black font-bold py-2 px-5 rounded shadow-xl font-press-start",
    backButtonHover: "hover:bg-green-500 hover:scale-105",
    backButtonAnimate: "animate__animated animate__flash",
    animations: {
      title: "animate__animated animate__bounceIn",
      card: "animate__animated animate__fadeInUpBig",
      prizeList: "animate__animated animate__lightSpeedInLeft",
      hint: "animate__animated animate__pulse animate__infinite",
      scratchCard: "animate__animated animate__tada"
    }
  },
};