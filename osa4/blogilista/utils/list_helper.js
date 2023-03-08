const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  let favorite;
  let max;
  for (let i = 0; i < blogs.length; i++) {
    if (max == null || blogs[i].likes > max) {
      max = blogs[i].likes;
      favorite = blogs[i].title;
    }
  }

  return favorite;
};

const mostBlogs = (blogs) => {
  let mostCommonAuthor = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(_.last)
    .head()
    .value();
  let blogCount = _.chain(blogs)
    .countBy("author")
    .toPairs()
    .maxBy(_.last)
    .nth(1)
    .value();

  let authorObject = { author: mostCommonAuthor, blogs: blogCount };

  return authorObject;
};

const mostLikes = (blogs) => {
  let likes = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .maxBy("likes");

  console.log(likes);

  return likes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
