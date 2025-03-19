const API_URL = "https://servertest-gvl6.onrender.com/api/items";

export async function fetchItems() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("後端回應格式錯誤");
        }

        return result.data;
    } catch (error) {
        console.error("❌ 取得資料失敗:", error);
        throw error;
    }
}

export async function searchItems(query) {
    if (!query) throw new Error("請輸入查詢關鍵字！");

    try {
        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const result = await res.json();

        if (!res.ok || !result.success || !Array.isArray(result.data)) {
            throw new Error("查詢結果格式錯誤");
        }

        return result.data;
    } catch (error) {
        console.error("❌ 搜尋資料失敗:", error);
        throw error;
    }
}

export async function addItem(userId, name, description) {
    if (!userId || !name || !description) throw new Error("請輸入完整資料！（使用者 ID、名稱、描述）");

    try {
        const requestBody = JSON.stringify({ userId, name, description });

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error("新增資料失敗");
        }

        return result;
    } catch (error) {
        console.error("❌ 無法新增資料:", error);
        throw error;
    }
}

export async function editItem(id, userId, name, description) {
    if (!id || !userId || !name || !description) throw new Error("請輸入完整資料！");

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name, description }),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error("更新資料失敗");
        }

        return result;
    } catch (error) {
        console.error("❌ 更新資料失敗:", error);
        throw error;
    }
}

export async function deleteItem(id) {
    if (!id) throw new Error("缺少資料 ID");

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error("刪除資料失敗");
        }

        return result;
    } catch (error) {
        console.error("❌ 刪除資料失敗:", error);
        throw error;
    }
}
