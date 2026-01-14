// frontend/js/app.js

let currentFilter = 'all';
let editingBookId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Library Management System - Client');
    setupEventListeners();
    await loadBooks();
});

function setupEventListeners() {
    // Filter buttons
    document.getElementById('filter-all').addEventListener('click', () => {
        currentFilter = 'all';
        loadBooks();
    });
    document.getElementById('filter-available').addEventListener('click', () => {
        currentFilter = 'available';
        loadBooks('available');
    });
    document.getElementById('filter-borrowed').addEventListener('click', () => {
        currentFilter = 'borrowed';
        loadBooks('borrowed');
    });

    // Add book button
    document.getElementById('add-book-btn').addEventListener('click', () => {
        showBookForm();
    });

    // Form submit
    document.getElementById('book-form').addEventListener('submit', handleFormSubmit);

    // Close modal
    document.querySelector('.modal .close').addEventListener('click', hideBookForm);
}

// Load books from API
async function loadBooks(status = null) {
    try {
        showLoading();
        const res = await api.getAllBooks(status);
        renderBookList(res.data.books);
        updateStatistics(res.data.statistics);
        hideLoading();
    } catch (err) {
        console.error(err);
        alert('Failed to load books.');
        hideLoading();
    }
}

// Render book list
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

// Borrow / Return / Delete / Edit
async function borrowBook(id) {
    if (!confirm('Borrow this book?')) return;
    await api.borrowBook(id);
    alert('Book borrowed!');
    await loadBooks(currentFilter === 'all' ? null : currentFilter);
}

async function returnBook(id) {
    if (!confirm('Return this book?')) return;
    await api.returnBook(id);
    alert('Book returned!');
    await loadBooks(currentFilter === 'all' ? null : currentFilter);
}

async function deleteBook(id) {
    if (!confirm('Delete this book?')) return;
    await api.deleteBook(id);
    alert('Book deleted!');
    await loadBooks(currentFilter === 'all' ? null : currentFilter);
}

async function editBook(id) {
    const res = await api.getBookById(id);
    editingBookId = id;
    showBookForm(res.data);
}

// Show / Hide modal
function showBookForm(book = null) {
    document.getElementById('modal').style.display = 'block';
    if (book) {
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
    } else {
        document.getElementById('book-id').value = '';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

function hideBookForm() {
    document.getElementById('modal').style.display = 'none';
    editingBookId = null;
}

// Handle form submit
async function handleFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('book-id').value;
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();

    if (!title || !author || !isbn) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        if (id) {
            await api.updateBook(id, { title, author, isbn });
            alert('Book updated!');
        } else {
            await api.createBook({ title, author, isbn });
            alert('Book added!');
        }

        hideBookForm();
        await loadBooks(currentFilter === 'all' ? null : currentFilter);

    } catch (err) {
        console.error(err);
        alert('Failed to save book.');
    }
}

// Update statistics
function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

// Loading
function showLoading() { document.getElementById('loading').style.display = 'block'; }
function hideLoading() { document.getElementById('loading').style.display = 'none'; }
