const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({message: 'Post added successfully'});
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {id: '123123', title: 'First server side post', content: 'This is comming from the server'},
    {id: '3123', title: 'First server side post', content: 'This is comming from the server'},
    {id: '3231', title: 'First server side post', content: 'This is comming from the server'}
  ];
  res.status(200).json({
    success: true,
    posts: posts
  });
});


module.exports = app;
