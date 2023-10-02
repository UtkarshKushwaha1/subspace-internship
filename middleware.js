const _ = require("lodash");

const options = {
  method: "GET",
  headers: {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  },
};

const memo = (response) => {
  const responseLength = _.size(response.blogs);
  const longBlog = _.maxBy(response.blogs, (blog) => {
    return blog.title.length;
  });

  let privacyBlogs;
  response.blogs.forEach((blog) => {
    if (blog.title.includes("privacy")) privacyBlogs.push(blog);
  });

  const unqiueTitle = new Set();
  response.blogs.forEach((blog) => {
    unqiueTitle.add(blog.title);
  });

  


  return {
    length: responseLength,
    blog: longBlog,
    privacyBlogs: _.size(privacyBlogs),
    unique: Array.from(unqiueTitle),
  };
};

const middleware = (req, res, next) => {
  fetch("https://intent-kit-16.hasura.app/api/rest/blogs", options)
    .then((response) => response.json())
    .then((response) => {
      req.body = memo(response);
      next();
    })

    .catch((err) => console.error(err));
};

module.exports = middleware;