const BASE = import.meta.env.VITE_API_URL + '/authors';

// Gets all authors from the backend
export const getAuthors = () => fetch(BASE).then(res => res.json());

// GET /authors by ID
export const getAuthorById = async (id) => {
    const res = await fetch(`${BASE}/${id}`);
    if (!res.ok) throw new Error('Author not found');
    return res.json();
};

// POST/ request to create a new author
export const createAuthor = (data) =>
    fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());

// Deletes an author by ID
export const deleteAuthor = (id) =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' });
