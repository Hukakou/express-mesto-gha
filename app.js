const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/router');

const mongodbURL = 'mongodb://0.0.0.0:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '64663857f1c81c18a5f53958', // временный хардкод
  };

  next();
});

app.use(router);

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-unused-expressions
  err ? console.log(err) : console.log(`App listening on ${PORT}`);
});
