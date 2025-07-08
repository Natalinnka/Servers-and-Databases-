const BASE = import.meta.env.VITE_API_URL + '/books';
console.log('🔗 BASE URL:', BASE); // <-- Додай це

// GET /books
export const getBooks = async () => {
    const res = await fetch(BASE);
    return res.json();
};

// GET /books by ID
export const getBookById = async (id) => {
    const res = await fetch(`${BASE}/${id}`);
    if (!res.ok) throw new Error('Book not found');
    return res.json();
};


// POST /books
export const createBook = async (data) => {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
};
   
// PUT /books/:id
export const updateBook = async (id, data) => {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json(); 
};

// DELETE /books/:id
export const deleteBook = async (id) => {
    await fetch(`${BASE}/${id}`, { method: 'DELETE' });
};
