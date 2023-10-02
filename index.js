const express = require("express");
const axios = require('axios');
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



app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/blog-search', async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required.' });
  }

  try {
    // Make a GET request to your blog API using Axios
    const blogApiResponse = await axios.get(`YOUR_BLOG_API_ENDPOINT?q=${query}`);
    const blogData = blogApiResponse.data;

    // Assuming the API response contains an array of blog objects
    const filteredBlogs = blogData.filter(blog =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching blog data.' });
  }
});


app.listen(3000, () => {
  console.log("Listening");
});