// frontend/js/api.js
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllBooks(status = null) {
        try {
            let url = `${this.baseURL}/books`;
            if (status) {
                url += `?status=${status}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }

    async getBookById(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`);
        if (!response.ok) throw new Error(response.status);
        const result = await response.json();
        return result.data;
    }

    async createBook(bookData) {
        const response = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error(response.status);
        const result = await response.json();
        return result.data;
    }

    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error(response.status);
        const result = await response.json();
        return result.data;
    }

    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, {
            method: 'PATCH'
        });
        if (!response.ok) throw new Error(response.status);
        const result = await response.json();
        return result.data;
    }

    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, {
            method: 'PATCH'
        });
        if (!response.ok) throw new Error(response.status);
        const result = await response.json();
        return result.data;
    }

    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(response.status);
        return true;
    }
}

// Export
const api = new LibraryAPI('http://localhost:3000/api');
