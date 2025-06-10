
// In-memory storage for bbooks and autohrs. Later on, we will connect to a database instead.
const books = [
    { id: 1, name: 'Sherlock Holmes', price: 20.99, author_id: 1 },
    { id: 2, name: 'When Breath Becomes Air', price: 15.0, author_id: 2 }
];

let authors = [
    { id: 1, name: 'Arthur Conan Doyle' },
    { id: 2, name: 'Paul Kalanithi' },
    { id: 99, name: 'Anonymous' }
];

module.exports = {
    books,
    authors,
};
