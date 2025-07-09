import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../services/authorService';
import styles from './List.module.css';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  const handleDelete = async (id) => {
    await deleteAuthor(id);
    setAuthors(authors.filter((a) => a.id !== id));
  };

  return (
    <div className={styles.card}>
      <h2>👤 Authors</h2>
      <ul className={styles.authorList}>
        {authors.map((author) => (
          <li key={author.id} className={styles.authorItem}>
            <span>{author.name}</span>
            <button onClick={() => handleDelete(author.id)} className={styles.deleteButton}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
