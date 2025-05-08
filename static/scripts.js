document.addEventListener('DOMContentLoaded', () => {
          const addBookForm = document.getElementById('add-book-form');
          const booksTableBody = document.querySelector('#books-table tbody');
      
          addBookForm.addEventListener('submit', async (event) => {
              event.preventDefault();
      
              const title = document.getElementById('title').value;
              const author = document.getElementById('author').value;
              const isbn = document.getElementById('isbn').value;
              const publishedYear = document.getElementById('published-year').value;
      
              const response = await fetch('/add-book', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      title,
                      author,
                      isbn,
                      publishedYear
                  })
              });
      
              if (response.ok) {
                  loadBooks();
              }
          });
      
          async function loadBooks() {
              const response = await fetch('/get-books');
              const books = await response.json();
      
              booksTableBody.innerHTML = '';
              books.forEach(book => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td>${book.published_year}</td>
                      <td>${book.available ? 'Yes' : 'No'}</td>
                      <td>
                          <button onclick="borrowBook(${book.book_id})" ${!book.available ? 'disabled' : ''}>Borrow</button>
                          <button onclick="returnBook(${book.book_id})" ${book.available ? 'disabled' : ''}>Return</button>
                      </td>
                  `;
                  booksTableBody.appendChild(row);
              });
          }
      
          window.borrowBook = async function(bookId) {
              const response = await fetch('/borrow-book', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      bookId
                  })
              });
      
              if (response.ok) {
                  loadBooks();
              }
          }
      
          window.returnBook = async function(bookId) {
              const response = await fetch('/return-book', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      bookId
                  })
              });
      
              if (response.ok) {
                  loadBooks();
              }
          }
      
          loadBooks();
      });