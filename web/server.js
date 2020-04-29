require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8765;
const villainRouter = require('./routes/villains');

app.set('view engine', 'ejs');

app.use('/villains', villainRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
