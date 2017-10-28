const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require("./models/blogs.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 3001;
var blogs = [];

mongoose.connect("mongodb://localhost/test", { useMongoClient: true });

app.get('/api/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    res.json({
      blogs: blogs,
      total: blogs.length
    });
  })
});

app.post('/api/blogs', (req, res) => {
  var blogToSave = new Blog(req.body);
  blogToSave.save(function (err, savedBlog) {
    res.end();
  });
});

app.get('/api/blogs/:blogId', (req, res) => {
  Blog.findById(req.params.blogId, (err, blog) => {
    res.send(blog);
  });
});

app.delete('/api/blogs/:blogId', (req, res) => {
  Blog.findByIdAndRemove(req.params.blogId, (err, blog) => {
    res.end();
  })
});

app.put('/api/blogs/:blogId', (req, res) => {
  Blog.findById(req.params.blogId, (err, blog) => {
    blog.content = req.body.content;
    blog.save().then(() => res.end());
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
