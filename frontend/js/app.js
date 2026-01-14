// frontend/js/app.js

// Global state
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Library Management System - Client');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
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
}

async function loadBooks(status = null) {
    try {
        // TODO: แสดง loading state
        showLoading();
        
        // Call API
        const result = await api.getAllBooks(status);
        
        // TODO: อัปเดต statistics
        updateStatistics(result.statistics);
        
        // TODO: Render book list
        renderBookList(result.books);
        
        // TODO: ซ่อน loading state
        hideLoading();
        
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Failed to load books. Please try again.');
        hideLoading();
    }
}

async function borrowBook(id) {
    try {
        if (!confirm('Borrow this book?')) return;
        
        await api.borrowBook(id);
        alert('Book borrowed successfully!');
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error borrowing book:', error);
        alert('Failed to borrow book. Please try again.');
    }
}

// TODO: Implement other functions
// - returnBook(id)
// - deleteBook(id)
// - editBook(id)
// - handleFormSubmit(event)
// - updateStatistics(stats)
// - showLoading()
// - hideLoading()