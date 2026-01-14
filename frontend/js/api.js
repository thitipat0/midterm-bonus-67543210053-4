// frontend/js/api.js
class LibraryAPI {
    constructor(baseURL) {
        // baseURL ต้องรวม /api ด้วย เช่น http://192.168.48.101:3000/api
        this.baseURL = baseURL.replace(/\/$/, ''); // ตัด / ท้ายออกถ้ามี
    }

    async getAllBooks(status = null) {
        let url = `${this.baseURL}/books`;
        if (status) url += `?status=${status}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async createBook(book) {
        const res = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async updateBook(id, book) {
        const res = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async borrowBook(id) {
        const res = await fetch(`${this.baseURL}/books/${id}/borrow`, { method: 'PATCH' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async returnBook(id) {
        const res = await fetch(`${this.baseURL}/books/${id}/return`, { method: 'PATCH' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async deleteBook(id) {
        const res = await fetch(`${this.baseURL}/books/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
}

// --- กำหนด backend VM ที่ต้องการ ---
// สำหรับ localhost
// const api = new LibraryAPI('http://localhost:3000/api');

// สำหรับ VM (เช่น IP 192.168.48.101)
const api = new LibraryAPI('http://192.168.56.2:3000/api');
