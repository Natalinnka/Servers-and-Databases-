const endPointNotFound = (req, res) => {
  // return 404 and not found message 
  res.status(404).send({ error: 'Unknown endpoint' });
};

module.exports = {
  endPointNotFound,
};
