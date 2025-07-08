import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/bookService';
import { getAuthors } from '../services/authorService';
import styles from './Form.module.css';

export default function BookForm({ selected, onSuccess }) {
    const [form, setForm] = useState(selected || { name: '', price: '', author_id: '' });
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        getAuthors().then(setAuthors);
    }, []);

    useEffect(() => {
        // Якщо вибрано книгу для редагування — refresh form
        if (selected) {
            setForm(selected);
        }
    }, [selected]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.author_id) return;

        if (selected?.id) {
            await updateBook(selected.id, form);
        } else {
            await createBook(form);
        }

        setForm({ name: '', price: '', author_id: '' });
        onSuccess();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{selected ? 'Edit Book' : 'New Book'}</h2>
            <input
                id="bookName"
                name="name"
                placeholder="Book Name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                id="bookPrice"
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
            />
            <select
                id="authorId"
                name="author_id"
                value={form.author_id}
                onChange={handleChange}
                required
            >
                <option value="">Select Author</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>
            <button type="submit">Save</button>
        </form>
    );
}
