const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    displayName: { type: String },
    username: { type: String },
    blogTitle: { type: String },
    blogBody: { type: String },
    comments: [
      {
        name: { type: String },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
