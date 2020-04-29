const client = require('./client');

const getVillains = (cb) => {
  client
    .query('SELECT * FROM movie_villains')
    .then((result) => {
      cb(result.rows);
    });
};

const getVillainById = (id) => {
  return client
    .query('SELECT * FROM movie_villains WHERE id = $1', [id])
    .then(result => {
      return result.rows[0];
    });
};

module.exports = {
  getVillains,
  getVillainById
};
