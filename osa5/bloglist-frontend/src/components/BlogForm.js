import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <label htmlFor="author">author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <br />
        <label htmlFor="url">url:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
