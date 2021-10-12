const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const blogRoutes = require('./routes/blogRoute');
const userRoutes = require('./routes/usersRoute');
const path = require('path');
var cors = require('cors');

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.Promise = global.Promise;

const mongoURI =
  process.env.MONGODB_CONNECTION_STRING ||
  'mongodb://localhost:27017/MyDatabase';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

app.use('/api/blog/', blogRoutes);
app.use('/api/user/', userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('SERVER STARTED');
});
