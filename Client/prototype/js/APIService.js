class APIService {

    constructor(baseURL) {
        this.baseURL = baseURL;
        this.apiName="prizePool";
    }

    // 取得所有資料
    async fetchItems() {
        const url = `${this.baseURL}/${this.apiName}`;
        console.log(`🌍 發送 API 請求: ${url}`);

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`❌ HTTP 錯誤: ${res.status}`);
            }
            const data = await res.json();
            console.log("✅ API 回傳資料:", data);
            return data;
        } catch (error) {
            console.error("❌ 無法取得 API 資料:", error);
            return [];
        }
    }

       // 關鍵字搜尋
       async searchItems(_id) {
        const url = `${this.baseURL}/${this.apiName}/${_id}`;
        console.log(`🌍 發送 API 請求: ${url}`);
    
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`❌ HTTP 錯誤: ${res.status}`);
            }
            const data = await res.json();
            console.log("✅ API 回傳資料:", data);
            return data;
        } catch (error) {
            console.error("❌ 無法取得 API 資料:", error);
            return [];
        }
    }
}

export default APIService; // ✅ 使用 `export default` 讓 `app.js` 可以 `import`
