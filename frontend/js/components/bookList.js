// frontend/js/components/bookList.js
function renderBookList(books) {
    const container = document.getElementById('book-list');
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books found</p>';
        return;
    }
    
    // TODO: สร้าง HTML สำหรับแสดงรายการหนังสือ
    // แสดง: title, author, isbn, status
    // ปุ่ม: Borrow/Return, Edit, Delete
    
    const html = books.map(book => `
        <div class="book-card" data-id="${book.id}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Status:</strong> 
                <span class="status ${book.status}">${book.status}</span>
            </p>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button onclick="returnBook(${book.id})">Return</button>`
                }
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})" class="danger">Delete</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}