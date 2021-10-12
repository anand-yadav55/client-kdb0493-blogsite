const routes = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/users');

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

routes.get('/view-blog/:id', (req, res) => {
  Blog.findOne({ _id: req.params.id }).then((doc) => {
    res.send(doc);
  });
});

routes.get('/getComments/:id', (req, res) => {
  Blog.findOne({ _id: req.params.id }).then((doc) => {
    res.send(doc.comments.reverse());
  });
});

routes.post('/createBlog', async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) res.json({ msg: 'authentication tampering occured' });
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

routes.post('/addComment', async (req, res) => {
  const comment = { name: req.body.name, comment: req.body.comment };

  const comments = (await Blog.findOne({ _id: req.body.id })).comments;

  comments.push(comment);
  Blog.findOneAndUpdate(
    { _id: req.body.id },
    { $push: { comments: comment } },
    { new: true },
    function (err, doc) {
      if (err) console.log(err);
    }
  );
});

module.exports = routes;
