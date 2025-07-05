const BASE = import.meta.env.VITE_API_URL + '/authors';

// Gets all authors from the backend
export const getAuthors = () => fetch(BASE).then(res => res.json());

// Sends a POST request to create a new author
export const createAuthor = (data) =>
    fetch(BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());

// Deletes an author by ID
export const deleteAuthor = (id) =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' });
