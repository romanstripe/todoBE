const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const app = express();
app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURI = 'mongodb://localhost:27017/todolist';

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongoose is connected');
  })
  .catch((err) => {
    console.log('DB connection fail', err);
  });

app.listen(5000, () => {
  console.log('Server is on 5000');
});
