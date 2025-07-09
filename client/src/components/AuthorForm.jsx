import { useState } from 'react';
import { createAuthor } from '../services/authorService';
import styles from './Form.module.css';

export default function AuthorForm({ onSuccess }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        await createAuthor({ name });
        setName('');
        onSuccess?.();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Add Author</h2>
            <div className={styles.formRow}>
                <input
                    placeholder="Author Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">＋ Add</button>
            </div>
        </form>
    );
}
