function showBookForm(book = null) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    document.getElementById('form-title').textContent = book ? 'Edit Book' : 'Add Book';
    document.getElementById('book-id').value = book ? book.id : '';
    document.getElementById('title').value = book ? book.title : '';
    document.getElementById('author').value = book ? book.author : '';
    document.getElementById('isbn').value = book ? book.isbn : '';
}

function hideBookForm() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('book-id').value;
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();

    try {
        if (id) {
            await api.updateBook(id, { title, author, isbn });
            alert('Book updated successfully!');
        } else {
            await api.createBook({ title, author, isbn });
            alert('Book added successfully!');
        }
        hideBookForm();
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (err) {
        console.error(err);
        alert('Error saving book.');
    }
}
