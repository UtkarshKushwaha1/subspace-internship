const express = require("express");
const middleware = require("./middleware");
const app = express();
const path = require('path');


app.get("/", middleware, (req, res) => {
  res.send(
    `REQ: ${req.body.length}, ${req.body.blog.title} | ${
      req.body.privacyBlogs
    } | ${req.body.unique.map((v) => `${v} | `)}`
  );
});

app.get('/api/blog-search', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(3000, () => {
  console.log("Listening");
});