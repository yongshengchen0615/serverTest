// assets/themeStyles.js

export const themeStyles = {
    // 🧁 預設主題
    default: {
      // 🟦 背景樣式（將套用在外層容器）
      background: "bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100",
  
      // 🎉 標題文字
      title: "font-baloo text-5xl text-pink-600 font-extrabold mb-3 drop-shadow-md",
  
      // 🧊 卡片容器（外框）
     card: "bg-white/20 border-yellow-300 text-gray-900 w-full max-w-md mx-auto mt-16",
  
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
    birthdayTheme:{
 // 🎨 背景：五彩氣球漸層
 background: "bg-gradient-to-br from-pink-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100",

 // 🎉 標題文字：糖果色＋動感字體
 title: "font-baloo text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 font-extrabold mb-6 drop-shadow-lg animate__animated animate__rubberBand text-center",

 // 🧁 卡片容器：可愛蛋糕盒＋邊框糖霜感
 card: "bg-white/80 border-[3px] border-dashed border-pink-300 text-gray-900 w-full max-w-md mx-auto mt-14 rounded-[30px] shadow-2xl backdrop-blur-md",

 // 📢 小提示文字：馬卡龍色大字
 hint: "mt-4 text-blue-500 font-extrabold text-lg text-center animate__animated animate__flash animate__infinite",

 // 🎁 獎品清單區：糖果盒卡片
 prizeList: "bg-yellow-50 border-[3px] border-pink-400 p-5 rounded-[24px] mt-6 shadow-inner text-left",

 // 🎰 刮刮卡樣式：彩虹蛋糕色＋立體邊框
 scratchCard: "w-[300px] sm:w-[90%] h-[150px] flex items-center justify-center text-white text-3xl font-extrabold rounded-[24px] shadow-2xl bg-gradient-to-br from-pink-300 via-yellow-300 to-purple-400 border-[5px] border-white relative",

 // 🎨 Canvas 覆蓋層：滑鼠互動用
 scratchCanvas: "absolute top-0 left-0 w-full h-full rounded-[24px] shadow-md cursor-pointer",

 // ⬅️ 返回按鈕：糖果圓形大按鈕
 backButtonBase: "fixed bottom-4 left-4 sm:left-2 sm:bottom-2 bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 text-white font-bold py-2 px-6 sm:px-4 sm:py-1 rounded-full shadow-xl transition-all duration-300 transform border-2 border-white",

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

    }
  };
  