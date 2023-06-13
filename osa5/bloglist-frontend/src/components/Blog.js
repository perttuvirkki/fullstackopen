import React, { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog, loggedInUser }) => {
  const blogStyle = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  const [showInfo, setShowInfo] = useState(false);

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const showRemoveButton = () => {
    if (loggedInUser && blog.user && loggedInUser.name === blog.user.name) {
      return <button onClick={() => removeBlog(blog.id)}>remove</button>;
    }
    return null;
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}, {blog.author}
      <button onClick={toggleShowInfo}>{showInfo ? "hide" : "view"}</button>
      {showInfo && (
        <>
          <br />
          {blog.url}
          <br />
          {blog.likes} <button onClick={likeBlog}>like</button>
          <br />
          {blog.user.name}
          <br />
          {showRemoveButton()}
        </>
      )}
    </div>
  );
};

export default Blog;
