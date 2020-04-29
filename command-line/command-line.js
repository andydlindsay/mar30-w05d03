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

const verb = process.argv[2];
let id;

switch(verb) {
  case 'browse':
    client.query('SELECT * FROM movie_villains')
      .then((result) => {
        console.log(result.rows);
        client.end();
      });
    break;

  case 'read':
    id = process.argv[3];
    client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
      .then((result) => {
        console.log(result.rows);
        client.end();
      });
    break;

  case 'edit':
    id = process.argv[3];
    const newVillain = process.argv[4];
    client.query('UPDATE movie_villains SET villain = $1 WHERE id = $2;', [newVillain, id])
      .then(() => {
        console.log('villain updated successfully!');
        client.end();
      });
    break;

  case 'add':
    const villain = process.argv[3];
    const movie = process.argv[4];
    client.query('INSERT INTO movie_villains(villain, movie) VALUES($1, $2);', [villain, movie])
      .then(() => {
        console.log('villain has begun plotting');
        client.end();
      });
    break;

  case 'delete':
    id = process.argv[3];
    client.query('DELETE FROM movie_villains WHERE id = $1;', [id])
      .then(() => {
        console.log('villain has ceased plotting');
        client.end();
      });
    break;

  default:
    console.log('please enter a valid value');
    client.end();
}
