const express = require('express');
const router = express.Router();

// access to authors array
const { authors } = require('../data/data');

/**
 * TODO: Use router to define all CRUD operations: 1- get all, 2- get by id, 3- post a new author, 4- update an author, and 5- delete an author.
 *       Make sure to follow best practices as much as you can: use try-catch, use status codes efficiently, 
 *       and use console.log or console.error to print errors.
 *       Make sure to cover the cases of getting, deleting and updating an item that doesn't exist in the array, which should return: not found code (404)
 * 
 *       Follow the same rules of status codes and logic described in books routes. 
 *          
 *       Notice that post request now is a little simpler here. There is no checking of validity of "author_id" value here.
 */







/* TODO: End */
module.exports = router;