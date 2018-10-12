const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect('mongodb://localhost/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPITONS');
  next();
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(postCreadted => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: postCreadted._id
    });
  })
});

app.get('/api/posts', (req, res) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      res.status(200).json({
        success: true,
        posts: posts
      });
    })
});

app.delete("/api/posts/:id", (req, res) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted!'});
    });
});


module.exports = app;
