const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");
jest.setTimeout(20000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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

// 4.10

test("a blog can be added", async () => {
  const newBlog = {
    title: "this is a test",
    author: "tester",
    url: "testing.com",
    likes: 77,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((b) => b.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("this is a test");
});

// 4.11

test("likes default value", async () => {
  const newBlog = {
    title: "huutisblogi",
    author: "testhuut",
    url: "huut.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  console.log(response.body[response.length - 1]);

  expect(response).toBe(0);
});

// 4.12

test("no title, bad request", async () => {
  const newBlog = {
    author: "testhuut",
    url: "huut.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

//4.13

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  console.log(blogsAtStart);
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).not.toContainEqual(blogToDelete.title);
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
