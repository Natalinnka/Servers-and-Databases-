import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookService';
import styles from './List.module.css';

export default function BookList({ onSelect }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    const updated = books.filter((book) => book.id !== id);
    setBooks(updated);
  };

  return (
    <div className={styles.card}>
      <h2>📚 Books</h2>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.id} className={styles.bookItem}>
            <div className={styles.bookInfo}>
              <strong>{book.name}</strong> (${book.price})<br />
              <span>Author ID: {book.author_id}</span>
            </div>
            <div className={styles.bookActions}>
              <button onClick={() => onSelect(book)} className={styles.editButton}>✏️</button>
              <button onClick={() => handleDelete(book.id)} className={styles.deleteButton}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
