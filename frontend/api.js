class APIService {

    constructor(baseURL) {
        this.baseURL = baseURL;
        this.dbname="items";
    }

    // 取得所有資料
    async fetchItems() {
        const res = await fetch(`${this.baseURL}/`+this.dbname);
        return await res.json();
    }

    // 新增資料
    async addItem(name, phone) {
        const res = await fetch(`${this.baseURL}/`+this.dbname, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone })
        });
        return await res.json();
    }

    // 更新資料
    async updateItem(id, name, phone) {
        const res = await fetch(`${this.baseURL}/${this.dbname}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone })
        });
        return await res.json();
    }

    // 刪除資料
    async deleteItem(id) {
        await fetch(`${this.baseURL}/${this.dbname}/${id}`, { method: "DELETE" });
    }

    // 關鍵字搜尋
    async searchItems(keyword) {
        const res = await fetch(`${this.baseURL}/${this.dbname}/search?keyword=${keyword}`);
        return await res.json();
    }
}

export default APIService; // ✅ 使用 `export default` 讓 `app.js` 可以 `import`
