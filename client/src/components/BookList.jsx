import { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/bookService'; // <-- You'll implement these
import styles from './List.module.css';

export default function BookList({ onSelect }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(setBooks);
    }, []);

    const handleDelete = async (id) => {
        await deleteBook(id);
        const updated = books.filter(book => book.id !== id);
        setBooks(updated);
    };

    return (
        <div className={styles.card}>
            <h2>📚 Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>{book.name}</strong> (${book.price}) — Author ID: {book.author_id}
                        <button onClick={() => onSelect(book)}>✏️</button>
                        <button onClick={() => handleDelete(book.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
