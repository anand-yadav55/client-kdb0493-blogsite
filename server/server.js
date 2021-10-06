const express = require('express');
const app = express();

const routes = require('./routes');

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

app.use('/api/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('SERVER STARTED');
});
