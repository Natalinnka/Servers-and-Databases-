const express = require('express');
const router = express.Router();

// access to books and authors arrays. You will need to use both here.
const { books, authors } = require('../data/data');

// The first get method is provided below.
router.get('/', (req, res) => { // Get all books
  try {
    res.status(200).json(books);
  } catch (error) {
    res.sendStatus(500);
  }
});

/**
 * TODO: Use router to define the rest of CRUD operations: get by id, post a new book, update a book, and delete a book.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 *       
 *      
 */

/**
 *  Should return 200 on successful get, 404 if book not found and 500 on error.
 * 
 */
router.get('/:id', (req, res) => { // Get one book by ID
  try {
    // TODO.. 

  } catch (error) {
    // TODO.. 

  }
});

/**   When creating a new book, you need to assigne an auhtor to it through author_id. 
*     You need to check if author_id provided in the request is valid, which means it is available in the authors array.
*     If it doesn't exist in the array, or if it is missing from the request, you should give it a default value of 99, i.e. anonymous author.
*     
*     Important: ids of books should be incremental. In books array in data.js we have two books with ids 1 and 2 respectively.
*     Next added book should have id 3, and the next should have id of 4 and so on.
*      
*     You should also return "Bad request (400)" if name or price are missing.
*
*     Should return 201 on successful post, and 500 on error.
*/
router.post('/', (req, res) => {   //  Add a new book
  try {
    // TODO.. 

  } catch (error) {
    // TODO.. 

  }
});

/**
 *    Make sure to cover the case of updating an item that doesn't exist in the array, which should return: not found code (404)
 * 
 *    Should return 200 on successful put, and 500 on error.
 */
router.put('/:id', (req, res) => { // Update a book by ID
  try {
    // TODO.. 

  } catch (error) {
    // TODO.. 

  }
});

/**
 *    Make sure to cover the case of deleting an item that doesn't exist in the array, which should return: not found code (404)
 *    
 *    Should return 204 on successful delete, and 500 on error.
 */
router.delete('/:id', (req, res) => { // Delete a book by ID
  try {
    // TODO.. 

  } catch (error) {
    // TODO.. 

  }
});

module.exports = router;
