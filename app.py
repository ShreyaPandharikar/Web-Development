from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'

DATABASE = 'library.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                available_copies INTEGER NOT NULL
            )
        ''')
        db.commit()

@app.route('/')
def index():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM books')
    books = cursor.fetchall()
    return render_template('index.html', books=books)

@app.route('/add_book', methods=['POST'])
def add_book():
    title = request.form['title']
    author = request.form['author']
    available_copies = request.form['available_copies']
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO books (title, author, available_copies) VALUES (?, ?, ?)',
                   (title, author, available_copies))
    db.commit()
    flash('Book added successfully!')
    return redirect(url_for('index'))

@app.route('/delete_book/<int:book_id>', methods=['POST'])
def delete_book(book_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM books WHERE id = ?', (book_id,))
    db.commit()
    flash('Book deleted successfully!')
    return redirect(url_for('index'))

@app.route('/update_book/<int:book_id>', methods=['POST'])
def update_book(book_id):
    title = request.form['title']
    author = request.form['author']
    available_copies = request.form['available_copies']
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute('UPDATE books SET title = ?, author = ?, available_copies = ? WHERE id = ?',
                   (title, author, available_copies, book_id))
    db.commit()
    flash('Book updated successfully!')
    return redirect(url_for('index'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
