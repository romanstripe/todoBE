const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);

const mongoURI = MONGODB_URI_PROD;

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
