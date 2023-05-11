const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Kokkulin blogi",
    author: "kok",
    url: "kok.com",
    likes: 50,
  },
  {
    title: "Keken blogi",
    author: "kuk",
    url: "kek.com",
    likes: 100,
  },
];

const initialUsers = [
  { username: "pera", name: "perttu", password: "asd" },
  { username: "perbers", name: "bertil", password: "derp" },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb };
