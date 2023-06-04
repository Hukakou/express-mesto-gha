const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { createUserJoi, loginJoi } = require('./middlewares/celebrate');
const auth = require('./middlewares/auth');
const router = require('./routes/router');
const validation = require('./middlewares/validation');
const {
  createUser,
  login,
} = require('./controllers/users');

const mongodbURL = 'mongodb://0.0.0.0:27017/mestodb';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.post('/signin', loginJoi, login);
app.post('/signup', createUserJoi, createUser);
app.use(auth);
app.use(router);
app.use(errors());
app.use(validation);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, (err) => {
  // eslint-disable-next-line no-unused-expressions
  err ? console.log(err) : console.log(`App listening on ${PORT}`);
});
