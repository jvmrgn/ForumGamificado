import React from "react";
import AppBar from "../Components/AppBar/AppBar.jsx";
import PostsListPage from "../Components/PostsListPage/PostsListPage.jsx";
import SearchPosts from "../Components/SearchPosts/SearchPosts.jsx";

const authenticatedUser = {
  id: "123",
  name: "Teste",
  email: "teste@gmail.com",
};

function Posts() {
  return (
    <div>
      <AppBar />
      <SearchPosts authenticatedUser={authenticatedUser} />
      {/* <PostsListPage /> */}
    </div>
  );
}

export default Posts;
