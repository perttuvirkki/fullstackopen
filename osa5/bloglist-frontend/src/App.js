import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const loadBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(user.name + " logged in");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log("login failed", error);
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
      setMessage("logged out");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log("logout failed: ", error);
      setErrorMessage("logout failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      console.log("New blog created:", newBlog);
      //window.location.reload();
      setMessage(
        `${blogObject.title} by ${blogObject.author} added to bloglist!`
      );
      loadBlogs();
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log("create new failed: ", error);
      setErrorMessage("blog add failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const likeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, likedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch(() => {
        setErrorMessage(
          `Blog '${blog.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setBlogs(blogs.filter((n) => n.id !== id));
      });
  };

  const removeBlog = async (id) => {
    if (window.confirm("Are you sure you want to remove this blog?")) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage("Blog removed successfully");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage("Failed to remove blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const blogFormRef = useRef();

  const notification = () => {
    if (errorMessage !== null)
      return <div className="error">{errorMessage}</div>;

    if (message !== null) return <div className="success">{message}</div>;
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      {notification()}

      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <br />
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          removeBlog={removeBlog}
          loggedInUser={user}
          likeBlog={() => likeBlog(blog.id)}
        />
      ))}
    </div>
  );
};

export default App;
