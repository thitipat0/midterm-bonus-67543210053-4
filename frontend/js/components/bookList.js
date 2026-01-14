function renderBookList(books) {
    const container = document.getElementById('book-list');
    container.innerHTML = '';

    if (books.length === 0) {
        container.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-card');

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>ISBN: ${book.isbn}</p>
            <p>Status: <strong>${book.status}</strong></p>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>` 
                    : `<button onclick="returnBook(${book.id})">Return</button>`}
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;

        container.appendChild(div);
    });
}
