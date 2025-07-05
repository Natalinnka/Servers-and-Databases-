import { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import styles from './App.module.css';

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const refresh = () => window.location.reload();

  return (
    <div className={styles.app}>
      <header>Book Manager</header>
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
