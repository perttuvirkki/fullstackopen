const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

jest.setTimeout(15000);

const newUser = {
  username: "tester",
  name: "test user",
  password: "test",
};

const newBlog = {
  title: "this is a test",
  author: "tester",
  url: "testing.com",
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct amount of blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// 4.9

test("id is id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((item) => expect(item.id).toBeDefined());
});

// 4.23

test("a blog can be added", async () => {
  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201);

  const user = { username: "tester", password: "test" };

  const result = await api.post("/api/login").send(user);

  let { token } = result.body;
  token = `Bearer ${token}`;

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((b) => b.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("this is a test");
});

// 4.23

test("return new blog unauthorized without token", async () => {
  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201);

  const newBlog = {
    title: "this is a test",
    author: "tester",
    url: "testing.com",
    likes: 77,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

// 4.11

test("likes default value", async () => {
  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201);

  const user = { username: "tester", password: "test" };

  const result = await api.post("/api/login").send(user);

  let { token } = result.body;
  token = `Bearer ${token}`;

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  console.log(response.body[response.body.length - 1]);
  let addedBlog = response.body[response.body.length - 1];
  expect(addedBlog.likes).toBe(0);
});

// 4.12

test("no title, bad request", async () => {
  const newBlog = {
    author: "testhuut",
    url: "huut.com",
  };

  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201);

  const user = { username: "tester", password: "test" };

  const result = await api.post("/api/login").send(user);

  let { token } = result.body;
  token = `Bearer ${token}`;

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(400);
});

//4.13

test("a blog can be deleted", async () => {
  await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(newUser)
    .expect(201);

  const user = { username: "tester", password: "test" };
  const result = await api.post("/api/login").send(user);
  let { token } = result.body;
  token = `Bearer ${token}`;

  const newPostResult = await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogId = newPostResult.body.id;

  await api
    .delete(`/api/blogs/${blogId}`)
    .set("Authorization", token)
    .expect(204);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((b) => b.title);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
  expect(contents).not.toContain("this is a test");
});

//4.14

test("a blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  console.log(blogToUpdate);

  const updatedLikes = { likes: blogToUpdate.likes + 1 };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedLikes).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
