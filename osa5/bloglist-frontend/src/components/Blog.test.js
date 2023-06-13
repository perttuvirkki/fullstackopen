import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("renders content", () => {
  const blog = {
    title: "kekburgers",
    author: "kekman",
    url: "kek.fi",
  };

  const { container } = render(<Blog blog={blog} />);
  screen.debug();

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("kekburgers");
  expect(div).toHaveTextContent("kekman");
  expect(div).not.toHaveTextContent("kek.fi");
  expect(div).not.toHaveTextContent("likes");
});

test("displays URL and likes when 'view' button is clicked", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "testurl.com",
    likes: 10,
    user: { name: "Test User" },
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blog");

  expect(div).not.toHaveTextContent(blog.url);
  expect(div).not.toHaveTextContent(blog.likes);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  expect(div).toHaveTextContent(blog.url);
  expect(div).toHaveTextContent(blog.likes);
});

test("calls the event handler function twice when 'like' button is clicked twice", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "testurl.com",
    likes: 10,
    user: { name: "Test User" },
  };

  const mockLikeHandler = jest.fn();

  render(<Blog blog={blog} likeBlog={mockLikeHandler} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockLikeHandler).toHaveBeenCalledTimes(2);
});

test("calls the callback function with correct data when creating a new blog", async () => {
  // Luodaan mock takaisinkutsufunktio
  const user = userEvent.setup();
  const mockCreateBlog = jest.fn();

  render(<BlogForm createBlog={mockCreateBlog} />);

  // Syötetään tiedot lomakkeelle
  const sendButton = screen.getByText("create");
  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");

  const testData = {
    title: "Test Blog",
    author: "Test Author",
    url: "testurl.com",
  };

  await user.type(titleInput, testData.title);
  await user.type(authorInput, testData.author);
  await user.type(urlInput, testData.url);

  await user.click(sendButton);

  screen.debug();

  // Tarkistetaan, että takaisinkutsufunktio on kutsuttu oikeilla tiedoilla
  expect(mockCreateBlog).toHaveBeenCalledTimes(1);
  expect(mockCreateBlog).toHaveBeenCalledWith(testData);
});
