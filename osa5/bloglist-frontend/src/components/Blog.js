import React, { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
    <div style={blogStyle}>
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
