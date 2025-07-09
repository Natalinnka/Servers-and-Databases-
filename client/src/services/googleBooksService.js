const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';

export const fetchBookInfo = async (title) => {
  const res = await fetch(`${API_URL}${encodeURIComponent(title)}`);
  const data = await res.json();

  if (!data.items || data.items.length === 0) throw new Error('No books found');
  const book = data.items[0].volumeInfo;

  return {
    title: book.title,
    author: book.authors?.[0] || 'Unknown',
    description: book.description || 'No description available',
    cover: book.imageLinks?.thumbnail || ''
  };
};


