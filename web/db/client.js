const pg = require('pg');
const Client = pg.Client;

const options = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const client = new Client(options);

client.connect(() => {
  console.log(`connected to the database!!`);
});

module.exports = client;
