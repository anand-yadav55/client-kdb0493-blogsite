const routes = require('express').Router();

const { Blog } = require('../models/blog');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.get('/blogs', (req, res) => {
  Blog.find({})
    .sort({ _id: -1 })
    .exec((err, data) => {
      if (err) {
        throw new Error('Error detected in finding all blogs');
      }
      if (!data) {
        res.send([]);
      }
      res.status(200);
      res.send(data);
    });
});

routes.post('/createBlog', (req, res) => {
  console.log('recieved to write, ', req.body);
  const newBlog = new Blog({
    blogTitle: req.body.blogTitle,
    blogBody: req.body.blogBody,
  });
  newBlog.save((err, data) => {
    if (err) {
      throw new Error('Error detected in finding all blogs');
    }
    res.status(200).send(data);
  });
});

module.exports = routes;
