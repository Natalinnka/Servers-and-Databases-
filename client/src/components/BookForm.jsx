import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/bookService';
import { getAuthors, createAuthor } from '../services/authorService';
import { fetchBookInfo } from '../services/googleBooksService';
import styles from './Form.module.css';

export default function BookForm({ selected, onSuccess }) {
  const [form, setForm] = useState(
    selected || { name: '', price: '', author_id: '', newAuthorName: '' }
  );
  const [authors, setAuthors] = useState([]);
  const [googleData, setGoogleData] = useState(null);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  useEffect(() => {
    if (selected) {
      setForm({ ...selected, newAuthorName: '' });
      setGoogleData(null);
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bothFilled = form.author_id && form.newAuthorName;
    const noneFilled = !form.author_id && !form.newAuthorName;

    if (!form.name || !form.price || bothFilled || noneFilled) {
      alert('Please select an author OR enter a new author name (not both).');
      return;
    }

    let finalForm = { ...form };

    if (form.newAuthorName) {
      const newAuthor = await createAuthor({ name: form.newAuthorName });
      finalForm.author_id = newAuthor.id;
    }

    delete finalForm.newAuthorName;

    if (selected?.id) {
      await updateBook(selected.id, finalForm);
    } else {
      await createBook(finalForm);
    }

    setForm({ name: '', price: '', author_id: '', newAuthorName: '' });
    setGoogleData(null);
    onSuccess?.();
  };

  const handleFetch = async () => {
    if (!form.name) {
      alert('Please enter a book title to fetch.');
      return;
    }

    try {
      const data = await fetchBookInfo(form.name);
      setGoogleData(data);
    } catch (err) {
      alert('No data found for that title.');
    }
  };

  const handleUseFetched = () => {
    if (googleData) {
      setForm((prev) => ({
        ...prev,
        name: googleData.title,
        newAuthorName: googleData.author,
      }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{selected ? 'Edit Book' : 'New Book'}</h2>

      <div className={styles.formRow}>
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
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <select
          id="authorId"
          name="author_id"
          value={form.author_id}
          onChange={handleChange}
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <input
          name="newAuthorName"
          placeholder="New Author Name"
          value={form.newAuthorName}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={handleFetch}>Fetch Info</button>
      </div>

      {googleData && (
        <div style={{ marginTop: '1rem' }}>
          <strong>{googleData.title}</strong><br />
          <em>{googleData.author}</em><br />
          <p>{googleData.description}</p>
          {googleData.cover && <img src={googleData.cover} alt="cover" style={{ maxWidth: '120px' }} />}
          <br />
          <button type="button" onClick={handleUseFetched}>
            Use This Info
          </button>
        </div>
      )}
    </form>
  );
}


