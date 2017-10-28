const mongoose = require('mongoose');

const blogSchema = {
  content: String
};

var Blog = mongoose.model('exampleBlogs', blogSchema);

module.exports = Blog;
