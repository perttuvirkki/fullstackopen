describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.request("POST", "http://localhost:3003/api/users", {
      username: "testuser",
      name: "Test User",
      password: "testpassword",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "otheruser",
      name: "Other User",
      password: "otherpassword",
    });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in").click();
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();
      cy.contains("Test User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("wronguser");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "testpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("testurl.com");
      cy.get("#create-blog-button").click();
      cy.contains("Test Blog, Test Author");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "testpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be liked", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("testurl.com");
      cy.get("#create-blog-button").click();

      cy.contains("Test Blog, Test Author").contains("view").click();
      cy.contains("Test Blog, Test Author").contains("like").click();

      cy.contains("Test Blog, Test Author").contains("1 like");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "testpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });

      cy.contains("new blog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("testurl.com");
      cy.get("#create-blog-button").click();
    });

    it("User can remove a blog", function () {
      cy.contains("Test Blog, Test Author")
        .contains("view")
        .click()
        .parent()
        .contains("remove")
        .click();
      cy.contains("Test Blog, Test Author").should("not.exist");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "testpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });

      cy.contains("new blog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("testurl.com");
      cy.get("#create-blog-button").click();
    });

    it("User who added a blog sees the remove button", function () {
      cy.contains("Test Blog, Test Author")
        .contains("view")
        .click()
        .parent()
        .should("contain", "remove");
    });

    it("User who didn't add a blog doesn't see the remove button", function () {
      cy.clearLocalStorage();
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "otheruser",
        password: "otherpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });

      cy.contains("Test Blog, Test Author")
        .contains("view")
        .click()
        .parent()
        .should("not.contain", "remove");
    });
  });
  describe("Blog sorting", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "testuser",
        password: "testpassword",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("Blogs are sorted by likes in descending order", function () {
      const blogs = [
        { title: "Blog with least likes", author: "Author 3", likes: 1 },
        { title: "Blog with second most likes", author: "Author 2", likes: 2 },
        { title: "Blog with most likes", author: "Author 1", likes: 3 },
      ];

      cy.wrap(blogs).each((blog) => {
        cy.contains("new blog").click();
        cy.get("#title").type(blog.title);
        cy.get("#author").type(blog.author);
        cy.get("#url").type("testurl.com");
        cy.get("#create-blog-button").click();
        cy.contains(blog.title)
          .parent()
          .find("button")
          .contains("view")
          .click();
        cy.wait(500);
        for (let i = 0; i < blog.likes; i++) {
          cy.contains(`${blog.title}, ${blog.author}`)
            .find("button")
            .contains("like")
            .click();
          cy.wait(500);
        }
      });

      cy.get(".blog").eq(0).should("contain", "Blog with most likes");
      cy.get(".blog").eq(1).should("contain", "Blog with second most likes");
      cy.get(".blog").eq(2).should("contain", "Blog with least likes");
    });
  });
});
