const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Kokkulin blogi",
    author: "kok",
    url: "kok.com",
    likes: 50,
    id: "63f73fa988a5cb635bea4336",
  },
  {
    title: "Keken blogi",
    author: "kuk",
    url: "kek.com",
    likes: 100,
    id: "63f741fd6cdbf65412fd050d",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
