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
        setAuthors(authors.filter(a => a.id !== id));
    };

    return (
        <div className={styles.card}>
            <h2>👤 Authors</h2>
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        {author.name}
                        <button onClick={() => handleDelete(author.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
