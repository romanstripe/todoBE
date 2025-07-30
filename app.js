require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index');

console.log('ENV KEY:', process.env.JWT_SECRET_KEY);

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

const PORT = process.env.PORT || 5000; // Heroku 포트 or 로컬 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
