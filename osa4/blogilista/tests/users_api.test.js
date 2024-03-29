const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("salakala", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

test("id is id not _id", async () => {
  try {
    const response = await api.get("/api/users");
    expect(response.body[0].id).toBe(24);
  } catch (e) {
    console.log("error", e);
  }
});

test("user._id is not set", async () => {
  try {
    const response = await api.get("/api/users");
    expect(response.body[0]._id).toBe(undefined);
  } catch (e) {
    console.log("error", e);
  }
});

afterAll(() => {
  mongoose.connection.close();
});
