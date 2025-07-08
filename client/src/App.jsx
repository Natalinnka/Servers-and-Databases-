import { useState } from 'react';
import { getBookById } from './services/bookService';
import { getAuthorById } from './services/authorService';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import styles from './App.module.css';

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookId, setBookId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [bookResult, setBookResult] = useState(null);
  const [authorResult, setAuthorResult] = useState(null);
  const [error, setError] = useState('');

  const refresh = () => window.location.reload();

  const handleBookSearch = async () => {
    try {
      const data = await getBookById(bookId);
      setBookResult(data);
      setError('');
    } catch {
      setError('Book not found');
      setBookResult(null);
    }
  };

  const handleAuthorSearch = async () => {
    try {
      const data = await getAuthorById(authorId);
      setAuthorResult(data);
      setError('');
    } catch {
      setError('Author not found');
      setAuthorResult(null);
    }
  };

  return (
    <div className={styles.app}>
      <header>Book Manager</header>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <h2>🔍 Search by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <button onClick={handleBookSearch}>Find Book</button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Author ID"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
          <button onClick={handleAuthorSearch}>Find Author</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {bookResult && (
          <div>
            <h3>📘 Book:</h3>
            <p><strong>Name:</strong> {bookResult.name}</p>
            <p><strong>Price:</strong> ${bookResult.price}</p>
            <p><strong>Author ID:</strong> {bookResult.author_id}</p>
          </div>
        )}

        {authorResult && (
          <div>
            <h3>👤 Author:</h3>
            <p><strong>Name:</strong> {authorResult.name}</p>
            <p><strong>ID:</strong> {authorResult.id}</p>
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <BookForm selected={selectedBook} onSuccess={refresh} />
          <AuthorForm onSuccess={refresh} />
        </div>
        <div className={styles.rightColumn}>
          <BookList onSelect={setSelectedBook} />
          <AuthorList />
        </div>
      </div>
    </div>
  );
}
