const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
// add necessary imports below: Morgan and endPointNotFound

// Enable CORS for all routes and methods
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
/**
 * TODO: apply Morgan middleware (dev): https://expressjs.com/en/resources/middleware/morgan.html
 */

/* TODO: End */


const index = require('./routes/index');
/**
 * TODO: include books and authors route
 */

/* TODO: End */

app.use('/', index)
/**
 * TODO: use books and authors route
 */

/* TODO: End */


/**
 * TODO: apply unknown endpoints (endPointNotFound) middleware
 */

/* TODO: End */


// Exporting  the app for testing puporses
module.exports = app;

async function init() { // async for future additions below



  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  }
}

init();


